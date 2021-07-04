from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from oauth2client.service_account import ServiceAccountCredentials
import gspread
import yaml


def getWorksheetObject(gsheet_name, worksheet_name):
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('muse-product-order-form-363670efdb36.json', scope)
    gspread_client = gspread.authorize(creds)

    ss = gspread_client.open(gsheet_name)
    wks = ss.worksheet(worksheet_name)

    return wks

def getTwilioWhatsAppObject():
    
    # read the twilio_whatsapp_config yaml file
    with open("twilio_config.yaml", "r") as twilio_config_file:
        twilio_config = yaml.load(twilio_config_file, Loader = yaml.FullLoader)
        print("YAML read successfully!")
    
    account_sid = twilio_config['account_sid']
    auth_token = twilio_config['auth_token']
    twilio_client = Client(account_sid, auth_token)

    return twilio_config, twilio_client

def TriggerOrderReceivedMessage(first_name, last_name, order_id, total_amount, mobile_number, email_address, current_order_status, home_delivery_option, shipping_address):

    customer_message_body = f'''
        Namaste {first_name} {last_name}!

        Thank You for shopping with MUSE!

        Your order has been received successfully & has been accepted. Please find the order description below:

        Order ID: {order_id}

        Total Amount to be Paid: {total_amount}
        
        Comunication Details:
        Mobile Number: {mobile_number}
        Email Address: {email_address}
        Current Order Status: {current_order_status}

        Opted for Home Delivery: {home_delivery_option}
        Shipping Address: {shipping_address}


        You may track the status of your order using the following WhatsApp message command:
        1. <Order_ID> Status (Eg. MUSE01 Status) - to get the latest status of your order
        2. <Order_ID> Details (Eg. MUSE01 Status) - to get the description of your order
        3. Place Order - to place a new order

        You would receive a WhatsApp communication from our side once your order has been packed

        Once again we Thank You for shopping with us!
        Have a wonderful time ahead
    '''

    admin_message_body = f'''
        Hurray!! A new order has been received:
        
        Name: {first_name} {last_name}
        
        Order ID: {order_id}
        Total Amount to be Paid: {total_amount}
        Current Order Status: {current_order_status}
        
        Comunication Details:
        Mobile Number: {mobile_number}
        Email Address: {email_address}

        Opted for Home Delivery: {home_delivery_option}
        Shipping Address: {shipping_address}
    '''

    # get the client object for twilio
    twilio_config, twilio_client = getTwilioWhatsAppObject()

    # send the order received message to customer
    customer_message = twilio_client.messages.create(
                                body=customer_message_body,
                                from_=twilio_config['from'],
                                to='whatsapp:' + mobile_number
                            )

    # send the order received message to MUSE admin
    admin_message = twilio_client.messages.create(
                                body=admin_message_body,
                                from_=twilio_config['from'],
                                to=twilio_config['muse_admin']
                            )

    return customer_message.sid, admin_message.sid
