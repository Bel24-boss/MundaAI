import { CropScanAssessment, Language } from "../types";

// Translation dictionaries for Zimbabwean agronomy conditions
export const CROP_LOCAL_NAMES: Record<string, { Shona: string; Ndebele: string }> = {
  "Maize": { Shona: "Chibage (Maize)", Ndebele: "Umumbu (Maize)" },
  "Maize (Chibage)": { Shona: "Chibage (Maize)", Ndebele: "Umumbu (Maize)" },
  "Tomatoes": { Shona: "Madomasi (Tomatoes)", Ndebele: "Amatamatisi (Tomatoes)" },
  "Tomatoes (Madomasi)": { Shona: "Madomasi (Tomatoes)", Ndebele: "Amatamatisi (Tomatoes)" },
  "Potatoes": { Shona: "Mbatata (Potatoes)", Ndebele: "Amagwili (Potatoes)" },
  "Potatoes (Mbatata)": { Shona: "Mbatata (Potatoes)", Ndebele: "Amagwili (Potatoes)" },
  "Cotton": { Shona: "Donje (Cotton)", Ndebele: "Ukotini (Cotton)" },
  "Sorghum": { Shona: "Mapfunde (Sorghum)", Ndebele: "Amabele (Sorghum)" },
  "Groundnuts": { Shona: "Nzungu (Groundnuts)", Ndebele: "Amazambane (Groundnuts)" },
  "Soya Beans": { Shona: "Soya Bhinzi (Soybeans)", Ndebele: "Amabhontshisi eSoya (Soybeans)" },
};

export const LIKELIHOOD_TRANSLATIONS: Record<string, { Shona: string; Ndebele: string }> = {
  "High": { Shona: "Pamusoro (High)", Ndebele: "Phezulu (High)" },
  "Medium": { Shona: "Pakati (Medium)", Ndebele: "Phakathi (Medium)" },
  "Low": { Shona: "Pasi (Low)", Ndebele: "Phansi (Low)" },
};

export const CONFIDENCE_TRANSLATIONS: Record<string, { Shona: string; Ndebele: string }> = {
  "High": { Shona: "Chivimbo Chepamusoro", Ndebele: "Ukuthembeka Okuphezulu" },
  "Medium": { Shona: "Chivimbo Chepakati", Ndebele: "Ukuthembeka Okuphakathi" },
  "Low": { Shona: "Chivimbo Chepasi", Ndebele: "Ukuthembeka Okuphansi" },
};

// Known disease / condition translations
interface ConditionTranslation {
  name: { Shona: string; Ndebele: string };
  summary?: { Shona: string; Ndebele: string };
}

export const CONDITION_TRANSLATIONS: Record<string, ConditionTranslation> = {
  "Healthy, Robust Crop Canopy (Optimal Growth)": {
    name: {
      Shona: "Chirimwa Chakanaka, Chakasimba (Kukura Kwakanaka Kwazvo)",
      Ndebele: "Isilimo Esiphilileyo, Esiqinileyo (Ukukhula Okuhle Kakhulu)",
    },
    summary: {
      Shona: "Mashizha akasvibirira zvakadzika, akasimba zvakanaka, asina kukuvara nezvipfukuto kana zvirwere zvefungus, achiratidza kudya kwakaringana.",
      Ndebele: "Amakhasi aluhlaza okwesibhakabhaka okugcweleyo, aqinileyo, angenazo izilonda zezinambuzane kumbe izifo zokubola, abonisa ukondleka okuhle.",
    },
  },
  "Fall Armyworm (Spodoptera frugiperda) Whorl Damage": {
    name: {
      Shona: "Kukuvadzwa Kwemashizha neMhundu (Fall Armyworm)",
      Ndebele: "Ukulimala Kwamakhasi nge-Fall Armyworm",
    },
    summary: {
      Shona: "Kukuvadzwa kwemashizha nemakonye eMhundu anosiya makomba akabvaruka-bvaruka netsvina inoita sejecha mukati memwena yechibage.",
      Ndebele: "Ukulimala okukhulu kwamakhasi lapho izinambuzane ze-Fall Armyworm ezitshiya khona amabhobo lezibi ezinjengesihlabathi phakathi komumbu.",
    },
  },
  "African Maize Stem Borer": {
    name: {
      Shona: "Kupfukutwa neMakonye eStalk Borer",
      Ndebele: "Izinambuzane ze-Stem Borer eMumbini",
    },
  },
  "Common Maize Rust (Puccinia sorghi)": {
    name: {
      Shona: "Ngura yeChibage (Common Maize Rust)",
      Ndebele: "Ukugqwala koMumbu (Common Maize Rust)",
    },
    summary: {
      Shona: "Mavara akaita seruvara rwebhurawuni kana ngura anomuka pamusoro nepazasi pemashizha achiburitsa upfu hwefungus.",
      Ndebele: "Amabala anjengokugqwala anombala o-brown aphuma phezu laphansi kwamakhasi ekhupha impuphu yesifo sokugqwala.",
    },
  },
  "Southern Rust (Polysora Rust)": {
    name: {
      Shona: "Ngura yeSouthern Rust (Polysora)",
      Ndebele: "Ukugqwala kwe-Southern Rust (Polysora)",
    },
  },
  "Northern Corn Leaf Blight (NCLB / Turcicum)": {
    name: {
      Shona: "Chirwere cheBlight reMashizha eChibage (NCLB / Turcicum)",
      Ndebele: "Isifo se-Blight Emakhasini oMumbu (NCLB)",
    },
    summary: {
      Shona: "Mavara marefu akaita sechikwepa (cigar-shaped) anoita ruvara rwegrey-green kutevedza mutsipa weshizha.",
      Ndebele: "Amabala amade amise okwesigaridi anombala ompunga-luhlaza ahamba emaceleni kwamakhasi omumbu.",
    },
  },
  "Grey Leaf Spot (GLS)": {
    name: {
      Shona: "Mavara eGrey Leaf Spot (GLS)",
      Ndebele: "Amabala e-Grey Leaf Spot (GLS)",
    },
  },
  "Late Blight (Phytophthora infestans)": {
    name: {
      Shona: "Mhaiyora / Late Blight (Phytophthora infestans)",
      Ndebele: "Isifo se-Late Blight (Phytophthora infestans)",
    },
    summary: {
      Shona: "Mhaiyora inoparadza mashizha nemichero yemadomasi nekukurumidza panguva inonaya kana kuva nehunyoro hwakanyanya.",
      Ndebele: "Ukubola okuhlasela amakhasi lezithelo zamatamatisi ngokuphangisa ngemva kwezulu lokubandisa okuphakathi.",
    },
  },
  "Early Blight / Target Spot": {
    name: {
      Shona: "Early Blight / Mavara eTarget Spot (Alternaria)",
      Ndebele: "Isifo se-Early Blight / Target Spot (Alternaria)",
    },
  },
  "Potato Foliar Late Blight": {
    name: {
      Shona: "Mhaiyora yeMbatata (Potato Late Blight)",
      Ndebele: "Isifo se-Late Blight Kumagwili",
    },
    summary: {
      Shona: "Mavara akasviba anoita seakanyorova anopararira pamashizha embatata achigona kuuraya chidzinde mukati memazuva mashoma.",
      Ndebele: "Amabala amnyama athelele emakhasini amagwili angenzakalisa wonke umhlambi wesilimo ngezinsuku ezimbalwa.",
    },
  },
  "Suspected Nitrogen Deficiency (Nutrient Chlorosis)": {
    name: {
      Shona: "Kushomeka kweNitrogen (Kushanduka Yero kwemashizha)",
      Ndebele: "Ukuswelakala kwe-Nitrogen (Ukuphuzi kwamakhasi)",
    },
    summary: {
      Shona: "Mashizha ekuzasi anotanga kuita yero kupera kwemashizha achitevedza mutsetse wepakati (V-shape), zvichikonzerwa nekushomeka kwe fetereza yeAN kana mvura yakawandisa yakakukura chikafu.",
      Ndebele: "Amakhasi angaphansi aqala ukuba phuzi kusukela empikweni ahambe phakathi emgqeni, ngenxa yokuswela umquba we-AN loba izulu elinengi.",
    },
  },
};

// Sentence translation dictionary for exact symptom, check, and action phrases
const EXACT_SENTENCE_MAP: Record<string, { Shona: string; Ndebele: string }> = {
  // Healthy Maize Stand
  "Uniform deep green chlorophyl pigmentation across the entire leaf blade": {
    Shona: "Ruvara rwakasvibirira rwechlorophyll rwakafanana pamashizha ose",
    Ndebele: "Umbala oluhlaza okwesibhakabhaka ogcweleyo kulo lonke ikhasi",
  },
  "Zero ragged margins, no whorl frass, and zero fungal pustules or blight lesions": {
    Shona: "Hapana makomba akadyiwa nemakonye, hapana tsvina yeMhundu, uye hapana mavara e'rust' kana 'blight'",
    Ndebele: "Akula maphiko adabukileyo, akula zibi zezinambuzane, njalo akula mabala okugqwala kumbe okubola",
  },
  "Strong erect leaf architecture with healthy vegetative cell expansion": {
    Shona: "Mashizha akamira zvakanaka uye akasimba zvichiratidza utano hwakakwana",
    Ndebele: "Amakhasi amile qho njalo aqinile abonisa ukukhula okuhle kakhulu",
  },
  "Maintain scheduled split top-dressing of Ammonium Nitrate (AN) at 5 to 6 weeks post-emergence.": {
    Shona: "Rongai kuisa Ammonium Nitrate (AN) pachikamu chemavhiki 5 kusvika 6 mushure mekumera kwechibage.",
    Ndebele: "Hlela ukufaka umquba we-Ammonium Nitrate (AN) emavikini angu-5 kusiya ku-6 ngemva kokumila komumbu.",
  },
  "Check soil moisture around the root zone to ensure Pfumvudza organic mulch blanket remains intact.": {
    Shona: "Ongororai hunyoro muvhu muve nechokwadi chekuti marara (mulch) ePfumvudza achiri akavhara ivhu zvakanaka.",
    Ndebele: "Hlola umswakama womhlabathi uqinisekise ukuthi umquba we-mulch we-Intwasa usavikele umhlabathi.",
  },
  "Conduct routine weekly pest scouting (Fall Armyworm and stalk borers) to maintain clean status.": {
    Shona: "Rambai muchiongorora munda svondo rega rega kutarisa mhundu (Fall Armyworm) nemakonye e'stalk borer'.",
    Ndebele: "Qhubeka uhlola ipulazi njalo ngeviki ukuzingela izinambuzane ze-Fall Armyworm le-stalk borer.",
  },
  "Continue conservation agriculture management (Pfumvudza permanent soil cover and weed-free regime).": {
    Shona: "Rambai muchitevedzera mitemo yePfumvudza (kufukidza ivhu nemarara nekusabvumira masora mumunda).",
    Ndebele: "Qhubeka ulandela izimiso ze-Intwasa (ukusibekela umhlabathi le-mulch lokugcina insimu ingelakhula).",
  },
  "Apply top-dressing AN (10g / 1 bottle cap per Pfumvudza basin) when topsoil is moist.": {
    Shona: "Isai fetereza yeAN (10g / chifuniko chebhoforo pamugodhi wePfumvudza) kana ivhu riine hunyoro.",
    Ndebele: "Faka umquba we-AN (10g / isivalo se-bottle emgodini ngamunye we-Intwasa) nxa umhlabathi umanzi.",
  },
  "Log current crop milestone in your Mufarm field calendar.": {
    Shona: "Nyorai danho rekukura kwechirimwa chenyu mukarenda yemunda yeMufarm.",
    Ndebele: "Bhala isigaba sokukhula kwesilimo sakho ekhalendeni yensimu ye-Mufarm.",
  },
  "No escalation required. Your crop demonstrates excellent health.": {
    Shona: "Hapana chikonzero chekukwidza nyaya kuAgritex panguva ino. Chirimwa chenyu chiri kukura zvakanaka kwazvo.",
    Ndebele: "Akudingeki ukubikela abaleluleki beAgritex khathesi. Isilimo sakho siphilile kakhulu.",
  },
  "Crop condition assessment indicates strong vegetative health. Maintain standard agronomic practices.": {
    Shona: "Kuongororwa uku kunoratidza kuti chirimwa chiine utano hwakanaka kwazvo. Rambahai muchitevedzera tsika dzekurima dzemazuva ose.",
    Ndebele: "Ukuhlolwa kubonisa ukuthi isilimo siphilile kakhulu. Qhubeka ngemikhuba ejwayelekileyo yokulima.",
  },

  // Fall Armyworm Phrases
  "Ragged, torn feeding perforations on expanded vegetative leaf blades": {
    Shona: "Makomba akabvaruka-bvaruka akadyiwa nemakonye pamashizha eChibage",
    Ndebele: "Amabhobo adabukileyo adliwe zizinambuzane emakhasini omumbu",
  },
  "Transparent 'window-paning' where young instars scraped green parenchyma tissue": {
    Shona: "Mavara anoita se'windo' akacheneruka apo makonye madiki anokwapa mashizha",
    Ndebele: "Amabala amhlophe acwebileyo lapho amaphuphu amancane adle khona ikhasi",
  },
  "Accumulation of coarse yellowish-brown larval frass inside the central funnel": {
    Shona: "Tsvina yemakonye (frass) yakaita sejecha mukati memwoyo wechibage",
    Ndebele: "Izibi zezinambuzane ezinjengesihlabathi phakathi kwenhliziyo yomumbu",
  },
  "Gently unroll central whorl leaves to locate active caterpillars: observe inverted 'Y' suture on head capsule and four square pinacula on eighth abdominal segment.": {
    Shona: "Vhura mwoyo weshizha zvinyoronyoro kutarisa makonye: tarisai mucherechedzo wakaita se'Y' yakatsikitsira mumusoro uye mapundu mana pamagumo.",
    Ndebele: "Vula amakhasi aphakathi komumbu ngokunakekela ukuze ubone izibungu: khangela uphawu lwe-'Y' ekhanda layo.",
  },
  "Scout 20 consecutive plants across 5 distinct points in the field to calculate infestation percentage.": {
    Shona: "Ongororai zvidzinde makumi maviri munzvimbo shanu dzakasiyana mumunda kuti muone huwandu hwezvakakuvadzwa.",
    Ndebele: "Hlola izilimo ezingamatshumi amabili endaweni ezinhlanu ezitshiyeneyo ensimini.",
  },
  "Check early morning or late afternoon when caterpillars move actively towards the whorl surface.": {
    Shona: "Ongororai mangwanani kana manheru apo makonye anofamba achiuya pamusoro pemashizha.",
    Ndebele: "Hlola ekuseni kakhulu loba ntambama lapho izibungu ziphuma khona phezu kwamakhasi.",
  },
  "For Pfumvudza / smallholder plots: Hand-pick caterpillars or apply clean dry wood ash / coarse river sand directly into the whorl in early morning.": {
    Shona: "Paminda yePfumvudza: Nhongai makonye nemaoko kana kuisa dota rakaoma / jecha rerwizi mumwoyo wechibage mangwanani.",
    Ndebele: "Ezinsimini ze-Intwasa: Butha izibungu ngezandla kumbe ufake umlotha owomileyo / isihlabathi somfula phakathi komumbu ekuseni.",
  },
  "For commercial fields (>20% threshold): Spray registered insecticides (e.g. Belt Expert 480 SC / Emamectin Benzoate 5% SG / Ampligo) directly down into the whorls late in the afternoon.": {
    Shona: "Paminda mikuru kana kukuvara kwapfuura 20%: Poperai mishonga yakanyoreswa (e.g. Belt Expert, Emamectin Benzoate, kana Ampligo) mumwoyo mevhiki manheru.",
    Ndebele: "Ezinsimini ezinkulu: Fafaza imithi ebhalisiweyo (e.g. Belt Expert, Ampligo, Emamectin Benzoate) phakathi komumbu ntambama.",
  },
  "Rotate chemical MoA (Mode of Action) groups to preserve insecticide efficacy and prevent resistance.": {
    Shona: "Chinjai mishonga yakasiyana-siyana kuitira kudzivirira kuti makonye asazojairira mushonga mumwe chete.",
    Ndebele: "Tshintshanisa izinhlobo zemithi ukuze izibungu zingajwayeli umuthi owodwa.",
  },
  "Escalate immediately to Agritex Plant Protection if over 20% of plants show active larvae or if local spray fails.": {
    Shona: "Zivisai varimisi veAgritex nekukasira kana zvidzinde zvinopfuura 20% zvichiratidza makonye kana mushonga wamashandisa usingashande.",
    Ndebele: "Bikela abaleluleki beAgritex masinyane nxa izilimo ezedlula 20% zilabantwana bezibungu kumbe nxa umuthi ungasasebenzi.",
  },

  // Tomato Late Blight
  "Large, dark brown to olive-black water-soaked patches on ripening fruit": {
    Shona: "Mavara mahombe akaita seruvara rwakasviba anenge akanyorova pamadomasi ari kuibva",
    Ndebele: "Amabala amakhulu amnyama anjengamanzi ezithelweni zamatamatisi avuthwayo",
  },
  "Necrotic leaf collapse with water-soaked margins typical of post-rain humidity": {
    Shona: "Kusvava nekufa kwemashizha zvichitevedza mvura zhinji kana hunyoro",
    Ndebele: "Ukubuna lokufa kwamakhasi ngemva kwezulu elinengi lomsindo obandayo",
  },
  "Premature defoliation exposing sunscald risk to remaining clusters": {
    Shona: "Kudonha kwemashizha nguva isati yakwana zvinoita kuti zuva rikupure madomasi",
    Ndebele: "Ukuphela kwamakhasi okwenza ilanga litshise izithelo ezisele esihlahleni",
  },
  "Prune and destroy severely infected fruit and lower leaves immediately—never compost diseased plant tissue.": {
    Shona: "Damburirai madomasi nemashizha ane chirwere muapise—musamboise mumupfudze wecompost.",
    Ndebele: "Qamula izithelo lamakhasi agulayo ubatshise—ungabafaki emqubeni we-compost.",
  },
  "Spray copper-based fungicides (e.g. Copper Oxychloride 85 WP) or systemic fungicides (e.g. Ridomil Gold / Mancozeb + Metalaxyl) following label instructions.": {
    Shona: "Poperai mishonga yeCopper Oxychloride 85 WP kana Ridomil Gold / Mancozeb muchitevedza mirayiro yepamabhodhoro.",
    Ndebele: "Fafaza imithi ye-Copper Oxychloride 85 WP kumbe i-Ridomil Gold ulandela imiyalelo yebhotlela.",
  },
  "Switch strictly to furrow, drip, or root-zone watering; cease any overhead sprinkler watering to keep foliage dry.": {
    Shona: "Diridzai pasi nemakomba kana madrip; regai kudiridza nepamusoro nemaspinkler kuitira kuti mashizha asaome akanyorova.",
    Ndebele: "Nisela phansi ngemidiva loba i-drip; yekela ukufafaza amanzi phezu kwamakhasi ngama-sprinklers.",
  },
  "Escalate if blighted lesions spread to more than 15% of your tomato stands within 48 hours.": {
    Shona: "Batai mudhumeni weAgritex kana chirwere cheblight chikapararira kudarika 15% yemadomasi enyu mukati memaawa makumi mana nemasere.",
    Ndebele: "Bikela umeluleki weAgritex nxa isifo se-blight singathelela okudlula 15% wamatamatisi akho phakathi kwamahora angu-48.",
  },

  // General chemical disclaimer
  "This is an AI-assisted agronomic assessment based on visible symptoms. Confirm dosage and pre-harvest intervals (PHI) with certified agricultural chemical retailers (ZFC / Agricura / Windmill).": {
    Shona: "Uku kuongorora kweAI kunobva pane zviri kuoneka pambesa dzenyu. Tsvagai gwara remushonga nemazuva ekumirira (PHI) kune vanotengesa mishonga yakatendeka (ZFC / Agricura / Windmill).",
    Ndebele: "Lokhu kuhlola kwe-AI okusekelwe kulokho okubonakalayo. Qinisekisa isilinganiso semithi lemigomo yokuvuna labathengisi abagunyaziweyo (ZFC / Agricura / Windmill).",
  },
  "AI-assisted field assessment. Always wear protective gear (PPE) and follow pesticide label directions precisely.": {
    Shona: "Kuongorora kweAI kwemumunda. Pfekai zvekudzivirira (PPE) nguva dzose uye tevedzerai zvinonyorwa pamushonga.",
    Ndebele: "Ukuhlola kwe-AI epulazini. Gqoka impahla yokuzivikela (PPE) ngaso sonke isikhathi ulandele imiyalelo yomuthi.",
  },
};

// General keyword replacer for dynamic sentences generated by Gemini or custom inputs
const SHONA_TERMS: [RegExp, string][] = [
  [/top-dressing/gi, "fetereza yepamusoro (top-dressing)"],
  [/Ammonium Nitrate\s*\(AN\)/gi, "Ammonium Nitrate (AN)"],
  [/Ammonium Nitrate/gi, "Ammonium Nitrate (AN)"],
  [/Pfumvudza/gi, "Pfumvudza"],
  [/Agritex extension officer/gi, "mudhumeni weAgritex"],
  [/extension officer/gi, "mudhumeni wekurima"],
  [/Agritex/gi, "Agritex"],
  [/fungicide/gi, "mushonga wezvirwere zvefungus"],
  [/insecticide/gi, "mushonga wezvipfukuto"],
  [/pesticide/gi, "mushonga wezvipembenene"],
  [/mulch/gi, "marara anovhara ivhu (mulch)"],
  [/caterpillar/gi, "gonye"],
  [/caterpillars/gi, "makonye"],
  [/weeds/gi, "masora"],
  [/weed-free/gi, "risina masora"],
  [/soil moisture/gi, "hunyoro muvhu"],
  [/root zone/gi, "pamidzi"],
  [/fertilizer/gi, "fetereza"],
  [/spraying/gi, "kupopera"],
  [/spray/gi, "popera"],
  [/harvest/gi, "kukohwa"],
  [/leaves/gi, "mashizha"],
  [/leaf/gi, "shizha"],
  [/fruit/gi, "muchero"],
  [/stem/gi, "dzinde"],
  [/yellowing/gi, "kushanduka kuita yero"],
  [/chlorosis/gi, "kushanduka kuita yero (chlorosis)"],
  [/necrosis/gi, "kuora kana kusvava kwemashizha"],
  [/lesions/gi, "mavara echirwere"],
  [/pustules/gi, "mapundu echipfukuto kana fungus"],
  [/infestation/gi, "kupindwa nezvipfukuto"],
  [/High/g, "Pamusoro"],
  [/Medium/g, "Pakati"],
  [/Low/g, "Pasi"],
];

const NDEBELE_TERMS: [RegExp, string][] = [
  [/top-dressing/gi, "umquba wokugcwalisa (top-dressing)"],
  [/Ammonium Nitrate\s*\(AN\)/gi, "Ammonium Nitrate (AN)"],
  [/Ammonium Nitrate/gi, "Ammonium Nitrate (AN)"],
  [/Pfumvudza/gi, "Intwasa (Pfumvudza)"],
  [/Agritex extension officer/gi, "umeluleki wezolimo weAgritex"],
  [/extension officer/gi, "umeluleki wezolimo"],
  [/Agritex/gi, "Agritex"],
  [/fungicide/gi, "umuthi wesifo sefungus"],
  [/insecticide/gi, "umuthi wezinambuzane"],
  [/pesticide/gi, "umuthi wezinambuzane"],
  [/mulch/gi, "umquba wamahlamvu (mulch)"],
  [/caterpillar/gi, "isibungu"],
  [/caterpillars/gi, "izibungu"],
  [/weeds/gi, "ukhula"],
  [/weed-free/gi, "okungelakhula"],
  [/soil moisture/gi, "umswakama womhlabathi"],
  [/root zone/gi, "empandeni"],
  [/fertilizer/gi, "umquba"],
  [/spraying/gi, "ukufafaza"],
  [/spray/gi, "fafaza"],
  [/harvest/gi, "ukuvuna"],
  [/leaves/gi, "amakhasi"],
  [/leaf/gi, "ikhasi"],
  [/fruit/gi, "isithelo"],
  [/stem/gi, "isiqu"],
  [/yellowing/gi, "ukuphuzi kwamakhasi"],
  [/chlorosis/gi, "ukuphuzi (chlorosis)"],
  [/lesions/gi, "amabala esifo"],
  [/pustules/gi, "amabala okugqwala"],
  [/infestation/gi, "ukuhlaselwa yizinambuzane"],
  [/High/g, "Phezulu"],
  [/Medium/g, "Phakathi"],
  [/Low/g, "Phansi"],
];

function translateText(text: string, language: Language): string {
  if (!text || language === "English") return text;
  
  // 1. Check exact match
  const exact = EXACT_SENTENCE_MAP[text.trim()];
  if (exact && exact[language]) {
    return exact[language];
  }

  // 2. Check for condition summary match
  for (const cond of Object.values(CONDITION_TRANSLATIONS)) {
    if (cond.summary && text.includes("Dark green, uniform leaf blades")) {
      return cond.summary[language];
    }
  }

  // 3. Fallback: Apply contextual term dictionary
  let result = text;
  const terms = language === "Shona" ? SHONA_TERMS : NDEBELE_TERMS;
  for (const [regex, replacement] of terms) {
    result = result.replace(regex, replacement);
  }
  return result;
}

export function getLocalizedAssessment(
  assessment: CropScanAssessment,
  language: Language
): CropScanAssessment {
  if (!assessment) return assessment;
  if (language === "English") {
    return assessment;
  }

  // Localize crop name
  const rawCrop = assessment.crop || "";
  let localizedCrop = rawCrop;
  for (const [key, val] of Object.entries(CROP_LOCAL_NAMES)) {
    if (rawCrop.toLowerCase().includes(key.toLowerCase())) {
      localizedCrop = val[language];
      break;
    }
  }

  // Localize confidence
  const localizedConfidence = CONFIDENCE_TRANSLATIONS[assessment.confidence]?.[language] || assessment.confidence;

  // Localize possible issues
  const localizedIssues = (assessment.possibleIssues || []).map((issue) => {
    let name = issue.name;
    let summary = issue.summary;
    let likelihood = issue.likelihood;

    // Condition name match
    if (CONDITION_TRANSLATIONS[issue.name]) {
      name = CONDITION_TRANSLATIONS[issue.name].name[language];
      if (CONDITION_TRANSLATIONS[issue.name].summary) {
        summary = CONDITION_TRANSLATIONS[issue.name].summary![language];
      }
    } else {
      name = translateText(issue.name, language);
      summary = translateText(issue.summary, language);
    }

    if (LIKELIHOOD_TRANSLATIONS[issue.likelihood]) {
      likelihood = LIKELIHOOD_TRANSLATIONS[issue.likelihood][language];
    }

    return {
      ...issue,
      name,
      summary,
      likelihood,
    };
  });

  // Localize visible symptoms
  const localizedSymptoms = (assessment.visibleSymptoms || []).map((sym) =>
    translateText(sym, language)
  );

  // Localize what to check next
  const localizedChecks = (assessment.whatToCheckNext || []).map((chk) =>
    translateText(chk, language)
  );

  // Localize recommended actions
  const localizedActions = (assessment.recommendedAction || []).map((act) =>
    translateText(act, language)
  );

  // Localize escalation
  let localizedEscalation = assessment.escalation;
  if (assessment.escalation) {
    let trigger = translateText(assessment.escalation.trigger, language);
    let officerType = assessment.escalation.officerType;
    if (officerType) {
      if (language === "Shona") {
        officerType = officerType.replace(/Ward Agritex Extension Officer/gi, "Mudhumeni weAgritex weWadhi")
          .replace(/Extension Officer/gi, "Mudhumeni weKurima")
          .replace(/Plant Protection Unit/gi, "Chikamu cheKudzivirira Zvirimwa cheAgritex");
      } else if (language === "Ndebele") {
        officerType = officerType.replace(/Ward Agritex Extension Officer/gi, "Umeluleki weAgritex weWadi")
          .replace(/Extension Officer/gi, "Umeluleki weZolimo")
          .replace(/Plant Protection Unit/gi, "Iqembu lokuvikela izilimo leAgritex");
      }
    }
    localizedEscalation = {
      ...assessment.escalation,
      trigger,
      officerType,
    };
  }

  // Localize disclaimer
  const localizedDisclaimer = translateText(assessment.disclaimer, language);

  return {
    ...assessment,
    crop: localizedCrop,
    confidence: localizedConfidence,
    possibleIssues: localizedIssues,
    visibleSymptoms: localizedSymptoms,
    whatToCheckNext: localizedChecks,
    recommendedAction: localizedActions,
    escalation: localizedEscalation,
    disclaimer: localizedDisclaimer,
  };
}
