import {toast} from "react-toastify";
import {Base64} from 'js-base64';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('/utils.js');
var constants = require('/constants.js');


export default async function AuthorizeCreditCard(req, res) {
    let queryParam = req.query;
    let invoice = Base64.encode(queryParam.id)

    console.log("hey",queryParam)
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(constants.apiLoginKey);
    merchantAuthenticationType.setTransactionKey(constants.transactionKey);

    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(queryParam?.cardNumber);
    creditCard.setExpirationDate(queryParam?.expirationDate);
    creditCard.setCardCode(queryParam?.cardCode);

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    var orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(`INV-${invoice.slice(0,4)}`);
    orderDetails.setDescription('Product Description');

    var tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount('0.00');
    tax.setName('level2 tax name');
    tax.setDescription('level2 tax');

    var duty = new ApiContracts.ExtendedAmountType();
    duty.setAmount('0.00');
    duty.setName('duty name');
    duty.setDescription('duty description');

    var shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount('0.00');
    shipping.setName('shipping name');
    shipping.setDescription('shipping description');

    var billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(queryParam?.firstName);
    billTo.setLastName(queryParam?.lastName);
    billTo.setCompany('Souveniropolis');
    billTo.setAddress('street address');
    billTo.setCity('Pecan Springs');
    billTo.setState('TX');
    billTo.setZip('44628');
    billTo.setCountry('USA');

    var shipTo = new ApiContracts.CustomerAddressType();
    shipTo.setFirstName('China');
    shipTo.setLastName('Bayles');
    shipTo.setCompany('Thyme for Tea');
    shipTo.setAddress('12 Main Street');
    shipTo.setCity('Pecan Springs');
    shipTo.setState('TX');
    shipTo.setZip('44628');
    shipTo.setCountry('USA');

    var lineItem_id1 = new ApiContracts.LineItemType();
    lineItem_id1.setItemId('1');
    lineItem_id1.setName('vase');
    lineItem_id1.setDescription('cannes logo');
    lineItem_id1.setQuantity('18');
    lineItem_id1.setUnitPrice(queryParam?.amount);

    var lineItem_id2 = new ApiContracts.LineItemType();
    lineItem_id2.setItemId('2');
    lineItem_id2.setName('vase2');
    lineItem_id2.setDescription('cannes logo2');
    lineItem_id2.setQuantity('28');
    lineItem_id2.setUnitPrice('25.00');

    var lineItemList = [];
    lineItemList.push(lineItem_id1);
    lineItemList.push(lineItem_id2);

    var lineItems = new ApiContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    var userField_a = new ApiContracts.UserField();
    userField_a.setName('A');
    userField_a.setValue('Aval');

    var userField_b = new ApiContracts.UserField();
    userField_b.setName('B');
    userField_b.setValue('Bval');

    var userFieldList = [];
    userFieldList.push(userField_a);
    userFieldList.push(userField_b);

    var userFields = new ApiContracts.TransactionRequestType.UserFields();
    userFields.setUserField(userFieldList);

    var transactionSetting1 = new ApiContracts.SettingType();
    transactionSetting1.setSettingName('duplicateWindow');
    transactionSetting1.setSettingValue('120');

    var transactionSetting2 = new ApiContracts.SettingType();
    transactionSetting2.setSettingName('recurringBilling');
    transactionSetting2.setSettingValue('false');

    var transactionSettingList = [];
    transactionSettingList.push(transactionSetting1);
    transactionSettingList.push(transactionSetting2);

    var transactionSettings = new ApiContracts.ArrayOfSetting();
    transactionSettings.setSetting(transactionSettingList);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(queryParam.amount);
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setUserFields(userFields);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setDuty(duty);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);
    transactionRequestType.setTransactionSettings(transactionSettings);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    //Defaults to sandbox
    //ctrl.setEnvironment(SDKConstants.endpoint.production);

    ctrl.execute(function () {

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.CreateTransactionResponse(apiResponse);

        //pretty print response
        console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactionResponse().getMessages() != null) {
                    res.send({
                        response: {
                            transactionId: response.getTransactionResponse().getTransId(),
                            status: response.getTransactionResponse().getResponseCode(),
                            message: response.getTransactionResponse().getMessages().getMessage()[0].getDescription(),
                            description: response.getTransactionResponse().getMessages().getMessage()[0].getDescription(),
                        }
                    })
                } else {
                    console.log('Failed Transaction.');
                    if (response.getTransactionResponse().getErrors() != null) {
                        console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                        // console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    }
                    res.send({
                        response: [{
                            status: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                            description: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
                        }]
                    })
                }
            } else {
                console.log('Failed Transaction. ');
                if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
                    // console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                    // console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    res.send({
                        response: [{
                            status: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                            description: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
                        }]
                    })
                } else {
                    // console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    // console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                    res.send({
                        response: [{
                            status: response.getMessages().getMessage()[0].getCode(),
                            description: response.getMessages().getMessage()[0].getText(),
                        }]
                    })
                }
            }
        } else {
            console.log('Null Response.');
        }
        res.send({data: response})
    });
    //
    // try {
    //     res.send({data: response})
    // } catch (e) {
    //     e.message === 'HTTP request failed' ? res.send({error: e}) : res.send({error: e})
    // }

}