// SPDX-License-Identifier: MIT

// THIS CONTRACT IS UN-AUDITED!!.
// FOR DEMO PURPOSES!!!

pragma solidity 0.8.10;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IERC1155MintableBurnable is IERC1155 {
  function setTokenUri(uint256 tokenId, string memory uri) external;

  function mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) external;

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) external;

  function burn(
    address from,
    uint256 id,
    uint256 amount
  ) external;
}

error FeeNotProcessed(uint256 currentValue, uint256 expectedValue, bytes reason);
error NotEnoughBalance();
error InvalidOperation(uint256 currentValue, bytes expected);

contract ThirdBookShop is ERC1155Holder, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private tokenIdCounter;

  IERC1155MintableBurnable public immutable bookContract;
  IERC20 public immutable usdTokenContract;

  uint256 public shopFee; // big number 10**18
  uint256 public percentageClaim; // whole number
  uint256 private totalFeesPaid; // big number 10**18
  uint256 private totalShopClaim; // big number 10**6
  mapping(uint256 => address) private s_feeReciever; // tokenId to fee receiver
  mapping(uint256 => uint256) public s_price; // token id to price in bignumber. eg 5$ === 5 * 10**6
  mapping(address => uint256) private s_feeRecieverClaim; // seller to total tokens recieved

  /**
   * @param _shop_Fee - the fee in (wei) charged from a publisher
   * @param _percentage_Claim - the percent reserved for shop per each Book purchase
   * @param _book_Contract - erc1155 thirdbook token contract
   * @param _usd_Token_Contract - usdc address.
   */
  constructor(
    uint256 _shop_Fee,
    uint256 _percentage_Claim,
    address _book_Contract,
    address _usd_Token_Contract
  ) {
    shopFee = _shop_Fee;
    percentageClaim = _percentage_Claim;
    bookContract = IERC1155MintableBurnable(_book_Contract);
    usdTokenContract = IERC20(_usd_Token_Contract);
  }

  event PublishedBook(uint256 tokenId, address publisher, uint256 price);
  event PurchasedBook(uint256 tokenId, address buyer, uint256 price);
  event BurntBook(uint256 tokenId, address burner, uint256 amount);
  event ChangedShopFee(uint256 oldFee, uint256 newFee);

  // _price in decimals 10 ** 6, amount in whole numbers
  /**
   * @notice mints books of (amount) to the shop
   * @param _amount - the amount of books to be published
   * @param _price - the price of this book  specified in (wei)
   */
  function publish(
    uint256 _amount,
    uint256 _price,
    string memory _uri
  ) public payable {
    // shop fee only applies to book publishing
    // shop fee is collected in terms native token eth
    if (msg.value < shopFee) {
      revert FeeNotProcessed({
        currentValue: msg.value,
        expectedValue: shopFee,
        reason: "not enough eth to process transaction"
      });
    }
    // this is a book shop, one book for you, others for sale.
    if (_amount < 2) {
      revert InvalidOperation({currentValue: _amount, expected: "amount must be greater than 2"});
    }

    uint256 tokenId = tokenIdCounter.current();
    // sets the price of book with id (tokenId) to (_price)
    s_price[tokenId] = _price;
    // sets the book purchase fee reciever to the owner of the book
    s_feeReciever[tokenId] = msg.sender;
    tokenIdCounter.increment();
    totalFeesPaid += shopFee;
    // mints (_amount) books to this contract
    bookContract.mint(address(this), tokenId, _amount, "");
    // transfers a copy of newly minted books to the publisher
    bookContract.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
    emit PublishedBook(tokenId, msg.sender, _price);
    // update token uri if uri is provided
    if (bytes(_uri).length > 0) {
      _setTokenUri(tokenId, _uri);
    }
  }

  /**
   * @notice purchase an nft (book) with usdc
   * @param _tokenId - the id of the (book) to purchase
   * payable keyword - playing aroung with gas savings
   */
  function purchase(uint256 _tokenId) public payable {
    if (
      // revert if neither contract nor caller has enough balance
      (usdTokenContract.balanceOf(msg.sender) < s_price[_tokenId]) ||
      (bookContract.balanceOf(address(this), _tokenId) < 1)
    ) {
      revert NotEnoughBalance();
    }
    // approve before call
    // transfers usdc from msg.sender to contract
    bool success = usdTokenContract.transferFrom(msg.sender, address(this), s_price[_tokenId]);
    if (success) {
      // update book publisher's usdc claim
      s_feeRecieverClaim[s_feeReciever[_tokenId]] += s_price[_tokenId];
      // transfers book from contract to msg.sender
      bookContract.safeTransferFrom(address(this), msg.sender, _tokenId, 1, "");
      emit PurchasedBook(_tokenId, msg.sender, s_price[_tokenId]);
    }
  }

  // complete
  // amount in whole numbers
  /**
   * @notice burns amount of nft with tokenid.
   * @param _tokenId - the token to burn
   * @param _amount - the amount of (token) with ID (_tokenId) to burn from (msg.sender)
   */
  function burn(uint256 _tokenId, uint256 _amount) public {
    if (bookContract.balanceOf(msg.sender, _tokenId) < _amount) {
      revert NotEnoughBalance();
    }
    bookContract.burn(msg.sender, _tokenId, _amount);
    emit BurntBook(_tokenId, msg.sender, _amount);
  }

  /**
   * @notice sets the metadata uri for token of (tokenId)
   * @param tokenId - token identifier
   * @param _uri - token metadata uri
   */
  function _setTokenUri(uint256 tokenId, string memory _uri) public {
    bookContract.setTokenUri(tokenId, _uri);
  }

  // complete. new shop fee in decimals 10 ** 18
  /**
   * @dev updates the shop fee in wei to
   * @param _newShopFee - the new fee to charge each publisher before minting
   */
  function updateShopFee(uint256 _newShopFee) public onlyOwner {
    shopFee = _newShopFee;
    emit ChangedShopFee(shopFee, _newShopFee);
  }

  // may boot this method later
  /**
   * @notice transfer all usdc earned from the purchase of `msg.sender` books to caller
   */
  function claimTokens() public {
    uint256 amount = s_feeRecieverClaim[msg.sender];
    s_feeRecieverClaim[msg.sender] -= amount;
    // todo  safemath
    // subtracts 2% of the sellers total usdc earned from book purchases
    // (2%) goes to shop for each book purchased.
    uint256 claimRatio = (amount / 100) * percentageClaim;
    totalShopClaim += claimRatio;
    usdTokenContract.transfer(msg.sender, amount - claimRatio);
  }

  /**
   * @notice withraws eth and usdc from this contract to the owner
   * @param _amount - amount of eth in wei to withdraw from this contract
   */
  function withdraw(uint256 _amount) public onlyOwner {
    if (_amount > totalFeesPaid) {
      revert InvalidOperation({
        currentValue: _amount,
        expected: "amount must be <= total fees paid to the shop"
      });
    }
    totalFeesPaid -= _amount;
    (bool success, ) = msg.sender.call{value: _amount}("");
    require(success, "failed to widthraw funds");
    usdTokenContract.transfer(msg.sender, totalShopClaim);
  }
}
