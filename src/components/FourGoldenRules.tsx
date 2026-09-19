import React from "react";
import {
  KeyRound,
  QrCode,
  CreditCard,
  Send,
  ShieldCheck,
  AlertTriangle,
  Volume2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "./AudioNarrationButton";

export const FourGoldenRules: React.FC = () => {
  const { language } = useApp();

  const rules = [
    {
      id: "pin",
      icon: Send,
      title:
        language === "te"
          ? "1. UPI PIN: డబ్బు పంపడానికి మాత్రమే!"
          : language === "hi"
          ? "1. UPI PIN: केवल पैसे भेजने के लिए!"
          : "1. UPI PIN: Strictly for SENDING Money!",
      doText:
        language === "te"
          ? "దుకాణంలో వస్తువులు కొని డబ్బులు చెల్లించేటప్పుడు మాత్రమే PIN నొక్కండి."
          : language === "hi"
          ? "दुकान पर सामान खरीदकर पैसे चुकाते समय ही अपना गुप्त PIN डालें।"
          : "Enter PIN only when you want to pay money out of your account.",
      dontText:
        language === "te"
          ? "ఎవరైనా 'డబ్బులు వస్తాయి PIN కొట్టండి' అంటే ఎప్పటికీ నొక్కకండి. అది మోసం!"
          : language === "hi"
          ? "कोई कहे 'लॉटरी मिली है, पैसा पाने के लिए PIN डालो' तो कभी न डालें। वह फ्रॉड है!"
          : "NEVER enter a PIN to receive money or lottery prizes. That is 100% fraud!",
      audioText:
        language === "te"
          ? "మొదటి నియమం: యూపీఐ పిన్ అనేది మీరు డబ్బులు పంపేటప్పుడు మాత్రమే వాడాలి. డబ్బులు తీసుకోవడానికి పిన్ అవసరం లేదు."
          : language === "hi"
          ? "पहला नियम: UPI PIN केवल पैसे भेजने के लिए होता है। पैसे प्राप्त करने के लिए कभी PIN नहीं डालते।"
          : "Rule 1: UPI PIN is only for sending money, never for receiving money.",
    },
    {
      id: "otp",
      icon: KeyRound,
      title:
        language === "te"
          ? "2. OTP: మీ ఇంటి బీరువా తాళం చెవి!"
          : language === "hi"
          ? "2. OTP: आपके घर की तिजोरी की चाबी!"
          : "2. OTP: Your Private Vault Key!",
      doText:
        language === "te"
          ? "మీ ఫోన్‌కి వచ్చే 6 అంకెల OTP కోడ్‌ను రహస్యంగా ఉంచండి."
          : language === "hi"
          ? "मोबाइल पर आए 6 अंकों के OTP को हमेशा गुप्त रखें।"
          : "Keep the 6-digit OTP code received on your phone completely confidential.",
      dontText:
        language === "te"
          ? "ఫోన్ కాల్‌లో బ్యాంక్ మేనేజర్, పోలీస్ అని ఎవరు అడిగినా సరే — OTP చెప్పకండి!"
          : language === "hi"
          ? "फोन पर खुद को बैंक मैनेजर या अधिकारी बताने वाले को भी कभी OTP न बताएं!"
          : "Never tell OTP over a call, even if the caller claims to be a Bank Manager.",
      audioText:
        language === "te"
          ? "రెండవ నియమం: ఓటీపీ మీ ఇంటి తాళం లాంటిది. ఫోన్ కాల్‌లో ఎవరికీ చెప్పకూడదు."
          : language === "hi"
          ? "दूसरा नियम: OTP आपके घर की चाबी है। फोन पर किसी को भी कभी न बताएं।"
          : "Rule 2: OTP is your private key. Never share it with anyone over the phone.",
    },
    {
      id: "qr",
      icon: QrCode,
      title:
        language === "te"
          ? "3. QR కోడ్: దుకాణదారుడి డిజిటల్ బోర్డు"
          : language === "hi"
          ? "3. QR कोड: दुकानदार का डिजिटल पता"
          : "3. QR Code: The Shop's Digital Address",
      doText:
        language === "te"
          ? "కిరాణా లేదా కూరగాయల దుకాణంలో క్యూఆర్ కోడ్ స్కాన్ చేసి సరైన పేరు చూసుకోండి."
          : language === "hi"
          ? "सब्जी या किराने की दुकान पर QR कोड स्कैन करें और स्क्रीन पर नाम देखकर पैसे भेजें।"
          : "Scan the shop QR code and verify the shop name displayed before paying.",
      dontText:
        language === "te"
          ? "వాట్సాప్‌లో అపరిచితులు పంపిన QR కోడ్‌లను స్కాన్ చేయకండి."
          : language === "hi"
          ? "व्हाट्सएप पर किसी अजनबी द्वारा भेजे गए अनजान QR कोड को कभी स्कैन न करें।"
          : "Never scan strange QR codes sent by unknown contacts on WhatsApp.",
      audioText:
        language === "te"
          ? "మూడవ నియమం: క్యూఆర్ కోడ్ దుకాణం బోర్డు లాంటిది. దుకాణంలో మాత్రమే స్కాన్ చేయండి."
          : language === "hi"
          ? "तीसरा नियम: QR कोड दुकानदार का पता है। अनजान मैसेज में आए कोड को स्कैन न करें।"
          : "Rule 3: Only scan QR codes directly in trusted physical shops.",
    },
    {
      id: "atm",
      icon: CreditCard,
      title:
        language === "te"
          ? "4. ATM కార్డు: చేతితో కీప్యాడ్ దాచండి"
          : language === "hi"
          ? "4. ATM कार्ड: कीपैड को हाथ से छुपाएं"
          : "4. ATM Card: Shield Your Numbers",
      doText:
        language === "te"
          ? "ఏటీఎం మిషన్‌లో పిన్ నొక్కేటప్పుడు ఒక చేతితో కీప్యాడ్‌ను కప్పి ఉంచండి."
          : language === "hi"
          ? "ATM में पैसे निकालते समय एक हाथ से कीपैड को ढककर 4-अंकों का पिन दबाएं।"
          : "Always cover the ATM keypad with your other hand while typing your PIN.",
      dontText:
        language === "te"
          ? "ఏటీఎం కార్డును లేదా పిన్‌ను ఎవరికీ ఇవ్వకండి. సహాయం కోసం బ్యాంక్ గార్డుని మాత్రమే అడగండి."
          : language === "hi"
          ? "अपना ATM कार्ड किसी अनजान व्यक्ति के हाथ में न दें। सिर्फ बैंक गार्ड से ही पूछें।"
          : "Never hand your ATM card or PIN to strangers standing around the machine.",
      audioText:
        language === "te"
          ? "నాల్గవ నియమం: ఏటీఎంలో పిన్ నొక్కేటప్పుడు చేతితో దాచండి, కార్డు ఎవరికీ ఇవ్వకండి."
          : language === "hi"
          ? "चौथा नियम: ATM में पिन दबाते समय हाथ से छुपाएं, अपना कार्ड किसी अजनबी को न दें।"
          : "Rule 4: Cover your hand at the ATM machine and never give your card to strangers.",
    },
  ];

  return (
    <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900 shadow-xl space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {language === "te"
                ? "డిజిటల్ భద్రతా నియమాలు"
                : language === "hi"
                ? "डिजिटल सुरक्षा के 4 सुनहरे नियम"
                : "4 Golden Rules of Digital Safety"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
            {language === "te"
              ? "ఈ 4 విషయాలు తెలిస్తే — మీ పైసా ఎవరూ తీసుకోలేరు!"
              : language === "hi"
              ? "ये 4 बातें याद रखें — आपका एक भी पैसा कोई नहीं छीन सकता!"
              : "Remember These 4 Rules — Your Money is Always Safe!"}
          </h2>
        </div>

        <AudioNarrationButton
          text={
            language === "te"
              ? "ధనరక్ష డిజిటల్ భద్రత నాలుగు సూత్రాలు: ఒకటి, యూపీఐ పిన్ డబ్బులు పంపడానికి మాత్రమే. రెండు, ఓటీపీ ఎవరికీ చెప్పకూడదు. మూడు, దుకాణంలో మాత్రమే క్యూఆర్ స్కాన్ చేయాలి. నాలుగు, ఏటీఎంలో పిన్ కొట్టేటప్పుడు చేతితో దాచాలి."
              : language === "hi"
              ? "डिजिटल सुरक्षा के 4 सुनहरे नियम: पहला, UPI PIN केवल पैसे भेजने के लिए है। दूसरा, OTP किसी को न बताएं। तीसरा, सिर्फ दुकान पर QR कोड स्कैन करें। चौथा, ATM में पिन हाथ से छुपाएं।"
              : "4 Golden Rules: 1. UPI PIN is only for sending money. 2. Never share OTP. 3. Only scan trusted shop QR codes. 4. Shield the ATM keypad."
          }
          label={language === "te" ? "4 నియమాలు వినండి" : language === "hi" ? "4 नियम आवाज़ में सुनें" : "Listen to all rules"}
          className="bg-emerald-800 text-emerald-100 hover:bg-emerald-700"
        />
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.id}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-emerald-100">
                    {rule.title}
                  </h3>
                </div>

                <AudioNarrationButton
                  text={rule.audioText}
                  label=""
                  className="bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700 p-2"
                />
              </div>

              {/* Do vs Don't */}
              <div className="space-y-2 text-xs leading-relaxed pt-1">
                <div className="flex items-start gap-2 bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-800/40 text-emerald-200">
                  <span className="font-black text-emerald-400 shrink-0">✅ {language === "te" ? "చేయండి:" : language === "hi" ? "करें:" : "DO:"}</span>
                  <span>{rule.doText}</span>
                </div>

                <div className="flex items-start gap-2 bg-red-950/40 p-2.5 rounded-xl border border-red-800/30 text-red-200">
                  <span className="font-black text-red-400 shrink-0">❌ {language === "te" ? "చేయొద్దు:" : language === "hi" ? "कभी न करें:" : "DON'T:"}</span>
                  <span>{rule.dontText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
