from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
import yaml

# read the twilio_whatsapp_config yaml file
with open("twilio_config.yaml", "r") as twili_config_file:
    config = yaml.load(twili_config_file, Loader = yaml.FullLoader)
    print("YAML read successfully!")

def TriggerOrderReceivedMessage(first_name, last_name, order_id, total_amount, mobile_number, email_address, current_order_status, home_delivery_option, shipping_address):

    # Your Account Sid and Auth Token from twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = config['account_sid']
    auth_token = config['auth_token']
    client = Client(account_sid, auth_token)

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

    customer_message = client.messages.create(
                                body=customer_message_body,
                                from_=config['from'],
                                to='whatsapp:' + mobile_number
                            )

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

    admin_message = client.messages.create(
                                body=admin_message_body,
                                from_=config['from'],
                                to=config['muse_admin']
                            )

    return customer_message.sid, admin_message.sid
