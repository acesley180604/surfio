import { motion } from "framer-motion";
import Reveal from "./Reveal";

const rows = [
  ["全方位 AEO + 轉化漏斗", "基本賬戶管理"],
  ["品牌化文案 + 豐富視覺", "基本文案寫作"],
  ["科技行業專家", "通才"],
  ["策略性、易接觸嘅團隊", "唔穩定、難聯繫嘅團隊"],
  ["簡單透明定價", "見面先講價"],
  ["滿意保證", "無保障"],
  ["先進 AI 工作流程", "AI 廢話或者完全唔識 AI"],
];

export default function Comparison() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <div className="text-center mb-3">
          <h2 className="inline-block text-[26px] md:text-[32px] font-extrabold">
            <span className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              我哋同其他 AEO/SEO 公司有咩唔同？
            </span>
          </h2>
        </div>
        <p className="text-center text-[14px] text-gray-600 mb-1">
          我哋唔係一般嘅 agency。
        </p>
        <p className="text-center text-[14px] text-gray-600 mb-10">
          所以我哋嘅客戶唔會得到一般嘅結果。
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 text-left w-1/2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#7C3AED] flex items-center justify-center">
                      <span className="text-white text-[9px] font-extrabold">S</span>
                    </div>
                    <span className="font-extrabold text-gray-900 text-[14px]">SurfIO</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-left w-1/2 text-[14px] font-semibold text-gray-400">
                  其他 AEO/SEO 公司
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([us, them], i) => (
                <motion.tr
                  key={i}
                  className="border-b border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                      </span>
                      <span className="text-[13px] text-gray-900 font-medium">{us}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      </span>
                      <span className="text-[13px] text-gray-500">{them}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
