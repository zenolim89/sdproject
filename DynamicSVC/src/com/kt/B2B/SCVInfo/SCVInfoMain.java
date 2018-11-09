package com.kt.B2B.SCVInfo;

import java.util.ArrayList;

import com.google.gson.Gson;

public class SCVInfoMain {

	public static void main(String[] args) {

		// (jdlee) example
		SCVInfo scvinfo = new SCVInfo();
		scvinfo.setInterfaceType("voice");
		scvinfo.setSCVCode("RV010001");
		
		// (jdlee) ��ȭ���� Intent data access example
		ArrayList<ArrayList<slot>> GroupIntents = new ArrayList<ArrayList<slot>>();
		ArrayList<slot> IntentSlots1 = new ArrayList<slot>();		
		slot testslot = new slot("�����", "����־�?");
		slot testslot2 = new slot("���̽�ũ��", "����־�?");
	
		IntentSlots1.add(testslot);
		IntentSlots1.add(testslot2);
		GroupIntents.add(IntentSlots1);
		
		VoiceIntents Intents = new VoiceIntents();
		Intents.setIntents(GroupIntents);
		scvinfo.setIntent(Intents);
		/// --- end
		
		ArrayList<String> RefAPI = new ArrayList<String>();
		String API1 = "/B2B/services/api/v1/test1";
		String API2 = "/B2B/services/api/v1/test2";
		RefAPI.add(API1);
		RefAPI.add(API2);
		scvinfo.setRefAPI(RefAPI);
		
		scvinfo.setSCVDescription("����Ʈ �δ�ü� ��ȭ���");
		scvinfo.setSCVFunctionName("CallResortInfo");
		
		scvinfo.setTargetURL("https://api.yanolja.io/ui/zsdsdfGsfg");
		scvinfo.setMethodType("POST");
		scvinfo.setDataformat("KT STD");
		
		
		// (jdlee) java SCVInfo class to Json (use Gson developed by Google)	
		Gson gson = new Gson();
		String json = gson.toJson(scvinfo);
		
		System.out.println(json);
		
	}

}
