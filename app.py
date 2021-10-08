from flask import Flask, render_template, url_for, request
import pandas
from datetime import datetime as dt
import os
import json
from helper_functions import TriggerOrderReceivedMessage, getWorksheetObject

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def DisplayProductOrderForm():
    return render_template('index.html')

# function to render the order summary cart
@app.route('/cart', methods=['GET', "POST"])
def DisplayCart():
    return render_template('cart.html')

# @app.route('/bot', methods=['POST'])
# def bot():

#     # get a connection object to the MUSE product order sheet
#     wks = getWorksheetObject("MUSE Product Order Form", "Sheet1")

#     # get the order_id and the message part from the body of the incoming WhatsApp message
#     order_id, message = request.values.get('Body', '').lower().split(" ")

#     # get the row number of that particular cell
#     order_row_number = wks.find(order_id).row

#     # set a response flag
#     responded = False

#     # logic to cater the status requests from the customer
#     if message.lower() == "status":

#         # extract the status value of the Status column for the required row. Int value of "Status" column in sheet is 10
#         status_value = wks.cell(order_row_number, 10).value

#         response = MessagingResponse()
#         msg = response.message
#         msg.body(f"The status of your order with ID {order_id} is {status_value}")
#         responded = True

#     # logic to update the status value for an order by MUSE admin and notify the customer for the same
#     elif message.lower() in ['accepted', 'packed and ready', 'couriered', 'on hold']:

#         # update the Status value for the order_id updated by the MUSE admin
#         wks.update_cell(order_row_number, 10, message)

#         # TODO logic to send the updated status to the customer
#         responded = True

#     if ~responded:
#         response = MessagingResponse()
#         msg = response.message
#         msg.body("Please enter the appropriate commands!")


@app.route('/response', methods=['GET', 'POST'])
def StoreDataToGSheet():

    if request.method == "POST":
        
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')

        mobile_number = request.form.get('mobile_number')
        email_address = request.form.get('email_address')

        city = request.form.get('city')
        pincode = request.form.get('pincode')

        home_delivery_option = request.form.get('shipping_option')
        address_line_1 = request.form.get('address_line_1') if home_delivery_option == "YES" else "NA"
        address_line_2 = request.form.get('address_line_2') if home_delivery_option == "YES" else "NA"
        landmark = request.form.get('landmark') if home_delivery_option == "YES" else "NA"
        
        payment_mode_choice = request.form.get('payment_mode_choice')
        transaction_id = request.form.get('transaction_id') if payment_mode_choice == "NEFT" else "NA"
        
        reference = request.form.get('reference')
        volunteer_name = request.form.get('volunteer_name') if reference == "VSM Volunteer" else "NA"
        other_reference_source = request.form.get('other_reference_source') if reference == "Other" else "NA"
        stall_name = request.form.get('stall_name') if reference == "Diwali Stalls" else "NA"
        
        # get the order total
#         order_total = float(request.form.get('order_total'))
        
        # get the order details from an AJAX call in JSON format    
        order = request.form.get('order_summary')

        # parse the string into a python dictionary    
        order_dict = json.loads(order)

        # get all the products present in the order_dict into a set
        ordered_products = set(order_dict.keys())
        
        # define a set of all the products available in the system
        total_products = {
            'gulabAgarbatti50gm',
            'gulabAgarbatti250gm',
            'kevadaAgarbatti50gm',
            'kevadaAgarbatti250gm',
            'chandanAgarbatti50gm',
            'chandanAgarbatti250gm',
            'sonchafaAgarbatti50gm',
            'sonchafaAgarbatti250gm',
            'mograAgarbatti50gm',
            'mograAgarbatti250gm',
            'panadiAgarbatti50gm',
            'panadiAgarbatti250gm',
            'parijatakAgarbatti50gm',
            'parijatakAgarbatti250gm',
            'ubtan15gm',
            'ubtan100gm',
            'ubtan250gm',
            'smallDiya',
            'samayiDiya',
            'tulsiDiya',
            'vatiDiya'
        }

        # get the product keys taht have not been ordered by the customer
        unordered_products = total_products - ordered_products

        # assign the units to unordered product keys as 0 in the order_dict
        for key in unordered_products:
            order_dict[key] = 0

        print(order_dict)
        
        order_total = float(
            order_dict['gulabAgarbatti50gm']*25 + 
            order_dict['gulabAgarbatti250gm']*120 + 
            order_dict['kevadaAgarbatti50gm']*25 + 
            order_dict['kevadaAgarbatti250gm']*120 +
            order_dict['chandanAgarbatti50gm']*25 + 
            order_dict['chandanAgarbatti250gm']*120 +
            order_dict['sonchafaAgarbatti50gm']*25 + 
            order_dict['sonchafaAgarbatti250gm']*120 + 
            order_dict['mograAgarbatti50gm']*25 + 
            order_dict['mograAgarbatti250gm']*120 + 
            order_dict['panadiAgarbatti50gm']*25 + 
            order_dict['panadiAgarbatti250gm']*120 +
            order_dict['parijatakAgarbatti50gm']*25 + 
            order_dict['parijatakAgarbatti250gm']*120 + 
            order_dict['smallDiya']*30 + 
            order_dict['samayiDiya']*80 + 
            order_dict['tulsiDiya']*80 + 
            order_dict['vatiDiya']*120 +
            order_dict['ubtan15gm']*10 + 
            order_dict['ubtan100gm']*70 + 
            order_dict['ubtan250gm']*160 
        )

        print(order_total)
        
        # get a connection object to the MUSE product order sheet
        wks = getWorksheetObject("MUSE Product Order Form", "Automated Order")

        current_length = wks.col_values(17).__len__()

        # generate a order id in the form of ordercountddmmyyyy where ddmmyyyy represents the date at which the order has been placed
        order_id = str(current_length-2) + str(dt.now().date())[-2:] + str(dt.now().date())[5:7] + str(dt.now().date())[:4]
        
        wks.update('A'+str(current_length+1), order_id)
        wks.update('B'+str(current_length+1), str(dt.now().date()))
        wks.update('C'+str(current_length+1), first_name)
        wks.update('D'+str(current_length+1), last_name)
        wks.update('E'+str(current_length+1), reference)
        wks.update('F'+str(current_length+1), volunteer_name)
        wks.update('G'+str(current_length+1), other_reference_source)
        wks.update('H'+str(current_length+1), stall_name)
        wks.update('I'+str(current_length+1), mobile_number)
        wks.update('J'+str(current_length+1), email_address)
        wks.update('K'+str(current_length+1), home_delivery_option)
        wks.update('L'+str(current_length+1), address_line_1)
        wks.update('M'+str(current_length+1), address_line_2)
        wks.update('N'+str(current_length+1), landmark)
        wks.update('O'+str(current_length+1), city)
        wks.update('P'+str(current_length+1), pincode)
        wks.update('Q'+str(current_length+1), order_dict['gulabAgarbatti50gm'])
        wks.update('R'+str(current_length+1), order_dict['gulabAgarbatti250gm'])
        wks.update('S'+str(current_length+1), order_dict['sonchafaAgarbatti50gm'])
        wks.update('T'+str(current_length+1), order_dict['sonchafaAgarbatti250gm'])
        wks.update('U'+str(current_length+1), order_dict['panadiAgarbatti50gm'])
        wks.update('V'+str(current_length+1), order_dict['panadiAgarbatti250gm'])
        wks.update('W'+str(current_length+1), order_dict['kevadaAgarbatti50gm'])
        wks.update('X'+str(current_length+1), order_dict['kevadaAgarbatti250gm'])
        wks.update('Y'+str(current_length+1), order_dict['chandanAgarbatti50gm'])
        wks.update('Z'+str(current_length+1), order_dict['chandanAgarbatti250gm'])
        wks.update('AA'+str(current_length+1), order_dict['parijatakAgarbatti50gm'])
        wks.update('AB'+str(current_length+1), order_dict['parijatakAgarbatti250gm'])
        wks.update('AC'+str(current_length+1), order_dict['mograAgarbatti50gm'])
        wks.update('AD'+str(current_length+1), order_dict['mograAgarbatti250gm'])
        wks.update('AE'+str(current_length+1), order_dict['smallDiya'])
        wks.update('AF'+str(current_length+1), order_dict['samayiDiya'])
        wks.update('AG'+str(current_length+1), order_dict['tulsiDiya'])
        wks.update('AH'+str(current_length+1), order_dict['vatiDiya'])
        wks.update('AI'+str(current_length+1), order_dict['ubtan15gm'])
        wks.update('AJ'+str(current_length+1), order_dict['ubtan100gm'])
        wks.update('AK'+str(current_length+1), order_dict['ubtan250gm'])
        wks.update('AL'+str(current_length+1), order_total)
        wks.update('AM'+str(current_length+1), payment_mode_choice)
        wks.update('AN'+str(current_length+1), transaction_id)
       
        # print(TriggerOrderReceivedMessage(first_name, last_name, order_id, total_amount, mobile_number, email_address, "Acceptance in Progress", home_delivery_option, shipping_address))
        
        # TODO: add a response html template instead of a static message
        return render_template('success.html', order_id = order_id)    

if __name__ == '__main__':
    app.run() 
