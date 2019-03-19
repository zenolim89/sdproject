package com.kt.dataForms;

import java.util.ArrayList;
import java.util.List;

public class ExcelUploadForm {
	
	private String serviceName;
	private String invokeType;
	private String serviceType;
	private String serviceLink;
	private String serviceDesc;
	private String serviceCode;
	
	private String intentInfo;
	private String transMethod;
	
	private String CommonURL;
	private String testURL;
	
	private List<DicParam> dicList;
	
	private List<HttpParam> header;
	
	private List<HttpParam> reqParam;
	private String reqEx;

	private List<HttpParam> resParam;
	private String resEx;
	
	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getInvokeType() {
		return invokeType;
	}
	public void setInvokeType(String invokeType) {
		this.invokeType = invokeType;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getServiceLink() {
		return serviceLink;
	}
	public void setServiceLink(String serviceLink) {
		this.serviceLink = serviceLink;
	}
	public String getServiceDesc() {
		return serviceDesc;
	}
	public void setServiceDesc(String serviceDesc) {
		this.serviceDesc = serviceDesc;
	}
	public String getServiceCode() {
		return serviceCode;
	}
	public void setServiceCode(String serviceCode) {
		this.serviceCode = serviceCode;
	}
	public String getIntentInfo() {
		return intentInfo;
	}
	public void setIntentInfo(String intentInfo) {
		this.intentInfo = intentInfo;
	}

	public String getTransMethod() {
		return transMethod;
	}
	public void setTransMethod(String transMethod) {
		this.transMethod = transMethod;
	}
	public List<HttpParam> getReqParam() {
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(reqParam);
		return temp;
	}
	public void setReqParam(List<HttpParam> reqParam) {
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(reqParam);
		
		this.reqParam = temp;
	}
	public String getReqEx() {
		return reqEx;
	}
	public void setReqEx(String reqEx) {
		this.reqEx = reqEx;
	}
	public List<HttpParam> getResParam() {
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(resParam);
		return temp;
	}
	public void setResParam(List<HttpParam> resParam) {
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(resParam);
		
		this.resParam = temp;
		
	}
	public String getResEx() {
		return resEx;
	}
	public void setResEx(String resEx) {
		this.resEx = resEx;
	}
	public String getCommonURL() {
		return CommonURL;
	}
	public void setCommonURL(String commonURL) {
		CommonURL = commonURL;
	}
	public String getTestURL() {
		return testURL;
	}
	public void setTestURL(String testURL) {
		this.testURL = testURL;
	}
	public List<HttpParam> getHeader() {
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(header);
		return temp;
	}
	public void setHeader(List<HttpParam> header) {
		
		List<HttpParam> temp = new ArrayList<HttpParam>();
		temp.addAll(header);
		
		this.header = temp;
	}
	public List<DicParam> getDicList() {
		return dicList;
	}
	public void setDicList(List<DicParam> dicList) {
		this.dicList = dicList;
	}
	
	
	

}
