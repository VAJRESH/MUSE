from flask import Flask, render_template, url_for, request
import pandas
from datetime import datetime as dt
import os
from helper_functions import TriggerOrderReceivedMessage, getWorksheetObject

app = Flask(__name__)

@app.route('/home', methods=['GET', 'POST'])
def DisplayProductOrderForm():
    return render_template('muse.html')


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
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')

    mogra_units_50_gm = int(request.form.get('mogra_units_50_gm')) if request.form.get('mogra_units_50_gm') != "" else 0
    mogra_units_250_gm = int(request.form.get('mogra_units_250_gm')) if request.form.get('mogra_units_250_gm') != "" else 0

    sonchafa_units_50_gm = int(request.form.get('sonchafa_units_50_gm')) if request.form.get('sonchafa_units_50_gm') != "" else 0
    sonchafa_units_250_gm = int(request.form.get('sonchafa_units_250_gm')) if request.form.get('sonchafa_units_250_gm') != "" else 0

    gulab_units_50_gm = int(request.form.get('gulab_units_50_gm')) if request.form.get('gulab_units_50_gm') != "" else 0
    gulab_units_250_gm = int(request.form.get('gulab_units_250_gm')) if request.form.get('gulab_units_250_gm') != "" else 0

    utna_small = int(request.form.get('utna_small')) if request.form.get('utna_small') != "" else 0
    utna_medium = int(request.form.get('utna_medium')) if request.form.get('utna_medium') != "" else 0
    utna_large = int(request.form.get('utna_large')) if request.form.get('utna_large') != "" else 0

    mobile_number = request.form.get('mobile_number')
    email_address = request.form.get('email_address')
    
    home_delivery_option = request.form.get('home_delivery_option')
    shipping_address = request.form.get('shipping_address') if home_delivery_option == "Yes" else "No Home Delivery Opted"
    
    city = request.form.get('city')
    pincode = request.form.get('pincode')

    mode_of_payment = request.form.get('mode_of_payment')

    total_amount = (mogra_units_50_gm + gulab_units_50_gm + sonchafa_units_50_gm)*20 + (mogra_units_250_gm + gulab_units_250_gm + sonchafa_units_250_gm)*100
    total_amount = total_amount if total_amount != None else 0

    # get a connection object to the MUSE product order sheet
    wks = getWorksheetObject("MUSE Product Order Form", "Sheet1")

    current_length = wks.col_values(3).__len__()

    order_id = "MUSE"+str(current_length+1)

    shipping_address = shipping_address if home_delivery_option == "Yes" else "NA"
    
    wks.update('A'+str(current_length+1), order_id)
    wks.update('B'+str(current_length+1), str(dt.now()))
    wks.update('C'+str(current_length+1), gulab_units_50_gm)
    wks.update('D'+str(current_length+1), gulab_units_250_gm)
    wks.update('E'+str(current_length+1), sonchafa_units_50_gm)
    wks.update('F'+str(current_length+1), sonchafa_units_250_gm)
    wks.update('G'+str(current_length+1), mogra_units_50_gm)
    wks.update('H'+str(current_length+1), mogra_units_250_gm)
    wks.update('I'+str(current_length+1), utna_small)
    wks.update('J'+str(current_length+1), utna_medium)
    wks.update('K'+str(current_length+1), utna_large)
    wks.update('L'+str(current_length+1), total_amount)
    wks.update('M'+str(current_length+1), first_name)
    wks.update('N'+str(current_length+1), last_name)
    wks.update('O'+str(current_length+1), mobile_number)
    wks.update('P'+str(current_length+1), email_address)
    wks.update('Q'+str(current_length+1), home_delivery_option)
    wks.update('R'+str(current_length+1), shipping_address)
    wks.update('S'+str(current_length+1), city)
    wks.update('T'+str(current_length+1), pincode)
    wks.update('U'+str(current_length+1), mode_of_payment)
    wks.update('V'+str(current_length+1), reference)
    wks.update('W'+str(current_length+1), referee_volunteer)
    wks.update('X'+str(current_length+1), other_source_of_reference)
    wks.update('Y'+str(current_length+1), transaction_id)

    # print(TriggerOrderReceivedMessage(first_name, last_name, order_id, total_amount, mobile_number, email_address, "Acceptance in Progress", home_delivery_option, shipping_address))
    
    # TODO: add a response html template instead of a static message
    return "Hurray! check the sheet"    

if __name__ == '__main__':
    app.run() 