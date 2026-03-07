import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { StaggerContainer, StaggerItem } from "./Reveal";

const columns = [
  {
    title: "策略：",
    items: [
      "AEO 準備度審計同增長路線圖",
      "多平台答案引擎定位 (Google、Bing、Perplexity、ChatGPT 等)",
      "實體同主題權威性映射",
      "AI 答案收錄嘅內容中心同支柱策略",
      "高權威引用同連結獲取 (用於 LLM 訓練數據)",
      "基於問題嘅關鍵字擴展同優化",
    ],
  },
  {
    title: "執行：",
    items: [
      "直接答案同精選摘要優化",
      "FAQ schema、HowTo 同 Q&A 標記部署",
      "基於實體嘅內部連結同知識圖譜建設",
      "進階 schema 同結構化數據增強",
      "答案引擎友好嘅內容格式同索引優化",
    ],
  },
  {
    title: "監測：",
    items: [
      "跨主要 LLM 嘅答案出現追蹤",
      "精選摘要同「其他人也問」位置監測",
      "競爭對手 AEO 表現基準比較",
      "每月報告同改善建議",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <motion.div
        className="border-t border-gray-200 mb-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <Reveal>
        <h2 className="text-[26px] md:text-[32px] font-extrabold text-gray-900 text-center mb-10">
          A-Z 答案引擎優化
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {columns.map((col, colIdx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: colIdx * 0.15, duration: 0.6 }}
          >
            <h3 className="text-[15px] font-bold text-gray-900 mb-3">
              {col.title}
            </h3>
            <StaggerContainer className="space-y-2.5" staggerDelay={0.06}>
              {col.items.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-2">
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-900 mt-[7px] shrink-0" />
                    <span className="text-[13px] text-gray-600 leading-[1.65]">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
