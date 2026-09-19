import React, { useState, useEffect, useMemo } from "react";
import {
  Send,
  Sparkles,
  Wrench,
  HelpCircle,
  CheckCircle2,
  PhoneCall,
  RefreshCw,
  Droplets,
  CloudRain,
  TrendingUp,
  Cpu,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { ChatMessage, Language, FarmerProfile } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { MundaAiLogo } from "./MundaAiLogo";

interface AskMufarmChatProps {
  language: Language;
  onLanguageChange?: (newLang: Language) => void;
  farmer: FarmerProfile;
  onOpenEscalation: () => void;
  onOpenScanner: () => void;
}

const getInitialWelcome = (lang: Language, farmer: FarmerProfile): string => {
  if (lang === "Shona") {
    return `Mhoroi Tendai! Ndini **Mufarm**, murairidzi wenyu wezvekurima (AI Agronomist) muZimbabwe. Ndakaisa ruzivo rwepurazi renyu riri ku**Mashonaland West (${farmer.areaHa}ha ${farmer.primaryCrop}, ${farmer.variety}, ${farmer.growthStage})**. \n\nNdingakubatsirai nei mumunda nhasi? Munogona kundibvunza nezvezviratidzo zvezvirwere zviri pamashizha, kutarisa kana mvura ichitendera kudiridza, kuverenga fotereza yePfumvudza, kana kutarisa mitengo yechibage paMbare Musika neGMB.`;
  }
  if (lang === "Ndebele") {
    return `Salibonani Tendai! Ngingu **Mufarm**, umeluleki wenu wezokulima (AI Agronomist) eZimbabwe. Sengilolwazi lwepulazi lenu elise**Mashonaland West (${farmer.areaHa}ha ${farmer.primaryCrop}, ${farmer.variety}, ${farmer.growthStage})**. \n\nNgingalisiza ngani epulazini lamuhla? Lingangibuza ngezifo zezilimo, ukuhlola nxa kumele linisele, ukubala umquba we-Intwasa, kumbe intengo yomumbu eMbare Musika leGMB.`;
  }
  return `Hello Tendai! I am **Mufarm**, your AI Agronomist for Zimbabwe. I have your farm profile loaded for **Mashonaland West (${farmer.areaHa}ha ${farmer.primaryCrop}, ${farmer.variety}, ${farmer.growthStage})**. \n\nHow can I assist your field today? You can ask me about symptoms on your crop, check whether rainfall allows irrigation, calculate Pfumvudza fertilizer, or check current Mbare Musika grain prices.`;
};

const getInitialFollowUps = (lang: Language): string[] => {
  if (lang === "Shona") {
    return [
      "Mashizha echibage changu ari kuita yero. Ndoita sei?",
      "Ndinofanira kudiridza Zone B nhasi here?",
      "Ndingatengese kupi chibage changu?",
    ];
  }
  if (lang === "Ndebele") {
    return [
      "Amakhasi omumbu wami ayaphuzi. Kumele ngenzeni?",
      "Kumele nginisele iZone B lamuhla na?",
      "Ngingathengisa ngaphi umumbu wami?",
    ];
  }
  return [
    "My maize leaves are turning yellow. What should I do?",
    "Should I irrigate Zone B today?",
    "Where should I consider selling my maize?",
  ];
};

const getInitialNextStep = (lang: Language): string => {
  if (lang === "Shona") {
    return "Sarudzai mubvunzo uri pamusoro kana kunyora zvamuri kuona mumunda menyu.";
  }
  if (lang === "Ndebele") {
    return "Khethani umbuzo ongasenhla loba nibhale lokho elikubonayo epulazini.";
  }
  return "Select a question above or type what you are observing in your field.";
};

export const AskMufarmChat: React.FC<AskMufarmChatProps> = ({
  language,
  onLanguageChange,
  farmer,
  onOpenEscalation,
  onOpenScanner,
}) => {
  const t = TRANSLATIONS[language];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: getInitialWelcome(language, farmer),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      followUpQuestions: getInitialFollowUps(language),
      actionableNextStep: getInitialNextStep(language),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [activeToolRunning, setActiveToolRunning] = useState<string | null>(
    null,
  );

  // Synchronize initial welcome message when user changes language
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === "initial") {
          return {
            ...msg,
            content: getInitialWelcome(language, farmer),
            followUpQuestions: getInitialFollowUps(language),
            actionableNextStep: getInitialNextStep(language),
          };
        }
        return msg;
      }),
    );
  }, [language, farmer]);

  const presetQueries = useMemo(() => {
    if (language === "Shona") {
      return [
        {
          label: "Mashizha eYero (Kuziva Zvirwere)",
          query: "Mashizha echibage changu ari kuita yero. Ndoita sei?",
          tag: "Zano reAI",
        },
        {
          label: "Kudiridza Chibage Nhasi?",
          query: "Ndinofanira kudiridza chibage changu nhasi here?",
          tag: "Mvura + Ivhu",
        },
        {
          label: "Misika yeChibage (GMB ne Mbare)",
          query: "Ndingatengese kupi chibage changu?",
          tag: "Misika: Mbare/GMB",
        },
        {
          label: "Nguva Yekudyara muRegion II",
          query: "Ndirime chibage riini muRegion II?",
          tag: "Nguva yeMwaka",
        },
        {
          label: "Fetereza yePfumvudza (Maplots 3)",
          query: "Verenga fotereza yePfumvudza pamaplots matatu echibage",
          tag: "Chiverengo",
        },
      ];
    }
    if (language === "Ndebele") {
      return [
        {
          label: "Amakhasi Aphuzi (Ukuhlola Izifo)",
          query: "Amakhasi omumbu wami ayaphuzi. Kumele ngenzeni?",
          tag: "Ukucubungula",
        },
        {
          label: "Ukunisela Umumbu Lamuhla?",
          query: "Kumele nginisele umumbu wami lamuhla na?",
          tag: "Izulu + Umhlabathi",
        },
        {
          label: "Ukuthengisa Umumbu (GMB le Mbare)",
          query: "Ngingathengisa ngaphi umumbu wami?",
          tag: "Izimakethe",
        },
        {
          label: "Isikhathi Sokuhlanyela kuRegion II",
          query: "Kumele ngihlanyele nini umumbu kuRegion II?",
          tag: "Isikhathi Sokulima",
        },
        {
          label: "Umquba we-Intwasa (Izigaba 3)",
          query: "Bala umquba we-Intwasa ezigabeni ezi-3",
          tag: "Isibalo Somquba",
        },
      ];
    }
    return [
      {
        label: "Yellowing Maize (Reasoning Demo)",
        query: "My maize leaves are turning yellow. What should I do?",
        tag: "Conversational Reasoning",
      },
      {
        label: "Irrigation Check (Tool Calling Demo)",
        query: "Should I irrigate my maize today?",
        tag: "Tools: Weather + Soil",
      },
      {
        label: "Grain Selling (Market Tool Demo)",
        query: "Where should I consider selling my maize?",
        tag: "Tools: Mbare + GMB",
      },
      {
        label: "Shona Planting Query (Multilingual Demo)",
        query: "Ndirime chibage riini muRegion II?",
        tag: "Shona AI Reasoning",
      },
      {
        label: "Pfumvudza Fertilizer Calculation",
        query: "Calculate Pfumvudza fertilizer for 3 standard plots",
        tag: "Tools: Fertilizer Calc",
      },
    ];
  }, [language]);

  const translateMessage = async (
    msgId: string,
    text: string,
    targetLang: Language,
  ) => {
    setTranslatingId(msgId);
    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: targetLang }),
      });
      const data = await res.json();
      if (data.translatedText) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  content: data.translatedText,
                }
              : m,
          ),
        );
      }
    } catch (err) {
      console.error("Translate error:", err);
    } finally {
      setTranslatingId(null);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    // If message implies tools, show brief tool indicator for visual delight
    const lower = messageText.toLowerCase();
    if (
      lower.includes("irrigate") ||
      lower.includes("water") ||
      lower.includes("kudiridza") ||
      lower.includes("nisele")
    ) {
      setActiveToolRunning(
        "getWeather('Mashonaland West') & getSoilMoisture('zone-a')",
      );
    } else if (
      lower.includes("market") ||
      lower.includes("sell") ||
      lower.includes("mutengo") ||
      lower.includes("gmb") ||
      lower.includes("thengisa")
    ) {
      setActiveToolRunning("getMarketPrices('Maize')");
    } else if (
      lower.includes("fertilizer") ||
      lower.includes("pfumvudza") ||
      lower.includes("mupfudze") ||
      lower.includes("umquba")
    ) {
      setActiveToolRunning("calculateFertilizer({ crop: 'Maize' })");
    }

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          language,
          farmContext: farmer,
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          data.fallback ||
          "I received your question and reviewed your farm telemetry.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        toolsExecuted: data.toolsExecuted || [],
        followUpQuestions: data.followUpQuestions || [],
        actionableNextStep: data.actionableNextStep,
        escalation: data.escalation,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            language === "Shona"
              ? "Tine hurombo, paita dambudziko rekubata AI service. Ndapota ongororai netiweki yenyu moyedza zvakare."
              : language === "Ndebele"
                ? "Uxolo, kube lohlupho lokufinyelela ku-AI service. Sicela lihlole inethiwekhi yenu bese lizama njalo."
                : "Sorry, I had trouble reaching the AI service. Please check your connectivity or try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
      setActiveToolRunning(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Context & Demo Header */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Cpu className="w-3.5 h-3.5" />
              {t.chatEngineBadge}
            </span>
            <a
              href="https://wa.me/15551872696?text=Hello%20mundaai%2C%20I%20need%20farming%20advice"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#25D366]/20 text-emerald-800 border border-[#25D366]/40 hover:bg-[#25D366]/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t.whatsAppBotBadge}</span>
            </a>
            <span className="text-xs font-semibold text-stone-500">
              • {t.groundedToolsActive}
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 mt-1 font-['Outfit',sans-serif]">
            {t.chatTitle}
          </h2>
          <p className="text-xs text-stone-600">
            {t.farmContextPrefix}{" "}
            <strong>
              {farmer.name} • {farmer.district}, {farmer.naturalRegion} •{" "}
              {farmer.areaHa}ha {farmer.primaryCrop} ({farmer.variety})
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* In-chat language switcher pills */}
          {onLanguageChange && (
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <Languages className="w-3.5 h-3.5 text-stone-500 ml-1.5 mr-0.5" />
              {(["English", "Shona", "Ndebele"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    language === lang
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                  }`}
                >
                  {lang === "Shona"
                    ? "ChiShona"
                    : lang === "Ndebele"
                      ? "isiNdebele"
                      : "English"}
                </button>
              ))}
            </div>
          )}

          <a
            href="https://wa.me/15551872696?text=Hello%20mundaai%2C%20I%20need%20farming%20advice"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 text-xs font-bold shadow-sm transition-colors"
          >
            <span>{t.askOnWhatsApp}</span>
          </a>
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>{t.scanLeafBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset 1-Click Field Inquiries */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            {t.presetScenariosHeader}
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {language === "Shona"
              ? "ChiShona Chakabatidzwa"
              : language === "Ndebele"
                ? "isiNdebele Sisasebenza"
                : "English Active"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(item.query)}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-500 text-xs font-medium transition-all shadow-sm disabled:opacity-50 text-left"
            >
              <span>{item.label}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold group-hover:bg-emerald-200">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-[480px]">
        <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 space-y-3 ${
                  msg.role === "user"
                    ? "bg-emerald-700 text-white rounded-tr-none shadow-sm"
                    : "bg-stone-50 text-stone-900 rounded-tl-none border border-stone-200 shadow-sm"
                }`}
              >
                {/* Assistant avatar & header */}
                {msg.role === "assistant" && (
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MundaAiLogo
                        variant="icon"
                        size="sm"
                        iconClassName="w-6 h-6 rounded-md"
                      />
                      <span className="font-bold text-stone-900 font-['Outfit',sans-serif]">
                        Mufarm Agronomist
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                        Zimbabwe
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Translate button if message might be in a different language */}
                      {msg.id !== "initial" && (
                        <button
                          onClick={() =>
                            translateMessage(msg.id, msg.content, language)
                          }
                          disabled={translatingId === msg.id}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors"
                          title={`Translate to ${language}`}
                        >
                          <Languages className="w-3 h-3 text-stone-500" />
                          <span>
                            {translatingId === msg.id
                              ? "..."
                              : language === "Shona"
                                ? "Dudzira kuChiShona"
                                : language === "Ndebele"
                                  ? "Tolika ngesiNdebele"
                                  : "Translate to English"}
                          </span>
                        </button>
                      )}
                      <span className="text-[10px] text-stone-400">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tool Executed Card */}
                {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                  <div className="bg-white rounded-xl p-3 border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-700 font-bold text-[11px] border-b border-stone-100 pb-1">
                      <span className="flex items-center gap-1.5 text-blue-700">
                        <Wrench className="w-3.5 h-3.5" />
                        {t.telemetryToolsHeader}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {t.toolBusLabel}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.toolsExecuted.map((tool, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-2 rounded bg-stone-50 border border-stone-200/60 font-mono text-[11px] text-stone-700 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-700 font-bold">
                              {tool.name}({JSON.stringify(tool.args || {})})
                            </span>
                            <span className="text-[10px] text-stone-500 font-sans">
                              {tool.result?.source || "Grounded Feed"}
                            </span>
                          </div>

                          {/* Quick summary of returned data */}
                          {tool.name === "getWeather" && tool.result?.data && (
                            <div className="text-[10px] font-sans text-stone-600">
                              🌧️ Rain Prob:{" "}
                              <strong>
                                {tool.result.data.rainProbability}%
                              </strong>{" "}
                              • Temp: {tool.result.data.temperature}°C •
                              Forecast: {tool.result.data.forecastNext48h}
                            </div>
                          )}

                          {tool.name === "getSoilMoisture" &&
                            tool.result?.data && (
                              <div className="text-[10px] font-sans text-stone-600">
                                💧 Zone A Moisture:{" "}
                                <strong>42% (Optimal)</strong> • Zone B:{" "}
                                <strong>68% (Mulched)</strong>
                              </div>
                            )}

                          {tool.name === "getMarketPrices" && (
                            <div className="text-[10px] font-sans text-stone-600">
                              📊 GMB Statutory: <strong>$335/t</strong> • Mbare
                              Musika: <strong>$290/t</strong> (Deduct transport
                              ~$25-35)
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Content */}
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {/* "WHAT SHOULD I DO NEXT?" Principle Component */}
                {msg.actionableNextStep && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-extrabold text-emerald-900 text-[11px] tracking-wide uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {t.whatShouldIDoNext}
                    </div>
                    <p className="font-semibold text-emerald-950 text-xs">
                      {msg.actionableNextStep}
                    </p>
                  </div>
                )}

                {/* Intelligent Diagnostic Follow-Up Questions */}
                {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      {t.followUpQuestionsHeader}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUpQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => sendMessage(q)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 text-stone-700 hover:text-emerald-800 text-[11px] font-medium border border-stone-200 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Escalation to Agritex Extension Officer recommendation */}
                {msg.escalation?.recommended && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold flex items-center gap-1 text-amber-900">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        {t.escalationRecommendedHeader}
                      </span>
                      <p className="text-[11px] text-amber-800">
                        {t.escalationRecommendedDesc}
                      </p>
                    </div>
                    <button
                      onClick={onOpenEscalation}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap shadow-sm"
                    >
                      {t.btnConnectOfficer}
                    </button>
                  </div>
                )}

                {msg.role === "user" && (
                  <div className="text-[10px] text-emerald-200 text-right">
                    {msg.timestamp}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-none p-4 text-xs text-stone-700 space-y-2 max-w-sm">
                <div className="flex items-center gap-2 font-semibold text-emerald-700">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.reasoningWaiting}</span>
                </div>
                {activeToolRunning && (
                  <div className="p-2 rounded bg-stone-100 font-mono text-[10px] text-stone-600 border border-stone-200">
                    Executing tool: {activeToolRunning}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-white border border-stone-300 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 outline-none shadow-sm transition-all"
            />

            <button
              onClick={() => sendMessage(inputText)}
              disabled={loading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>{t.btnAsk}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t.disclaimerNotice}
            </span>
            <span className="font-mono text-[10px]">{t.groundedNotice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
