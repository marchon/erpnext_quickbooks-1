// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

 
frappe.provide("frappe.ui.form");
frappe.provide("Quickbooks Settings");

frappe.ui.form.on('Quickbooks Settings', {
	refresh: function(frm) {
	var me = this;
	var quickbooks_authentication_url = ""
	 }
});

cur_frm.fields_dict["taxes"].grid.get_field("tax_account").get_query = function(doc, dt, dn){
	return {
		"query": "erpnext.controllers.queries.tax_account_query",
		"filters": {
			"account_type": ["Tax", "Chargeable", "Expense Account"],
			"company": frappe.defaults.get_default("Company")
		}
	}
},

cur_frm.cscript.connect_to_qb = function () {
	var me = this;
	if((cur_frm.doc.consumer_key != null) && (cur_frm.doc.consumer_secret != null) && (cur_frm.doc.consumer_key.trim() != "") && (cur_frm.doc.consumer_secret.trim() != "")){
		return frappe.call({
				method: "erpnext_quickbooks.erpnext_quickbooks.doctype.quickbooks_settings.quickbooks_settings.quickbooks_authentication_popup",
				args:{ 
					"consumer_key": cur_frm.doc.consumer_key,
					"consumer_secret": cur_frm.doc.consumer_secret},
				freeze: true,
	 			freeze_message:"Please wait.. connecting to Quickbooks ................",
				callback: function(r) {
					if(r.message){
						pop_up_window(decodeURIComponent(r.message),"Quickbooks");
					}
				}
		});
	}else{
		msgprint(__("Please Enter Proper Consumer Key and Consumer Secret"));
	}
}, 
 
cur_frm.cscript.sync_data_to_qb = function (frm) {
	var me = this;
	// if(me.quickbooks_authentication_url){
	if(!cur_frm.doc.__islocal && cur_frm.doc.enable_quickbooks_online=== 1){
		cur_frm.toggle_reqd("selling_price_list", true);
		cur_frm.toggle_reqd("buying_price_list", true);
		cur_frm.toggle_reqd("warehouse", true);

		return frappe.call({
				method: "erpnext_quickbooks.api.sync_quickbooks_resources",
			});
	}
	
},

pop_up_window = function(url,windowName) {
	window.location.assign(url)
}
