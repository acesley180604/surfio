import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0d0820] text-white">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <h4 className="text-[14px] font-bold text-[#EC4899] mb-4">聯絡</h4>
            <div className="space-y-3">
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                聯絡我哋
              </a>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                WhatsApp
              </a>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                香港科學園
              </a>
            </div>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="text-[14px] font-bold text-[#7C3AED] mb-4">行業</h4>
            <div className="space-y-2">
              {["金融服務", "會計師事務所", "B2B 軟件", "法律服務", "醫療服務", "電商", "教育科技", "初創企業"].map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>

          {/* Strategies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <h4 className="text-[14px] font-bold text-[#7C3AED] mb-4">策略</h4>
            <div className="space-y-2">
              {["B2B 數碼營銷", "電商營銷", "效果營銷", "客戶獲取", "潛在客戶開發", "需求生成", "集客式營銷", "增長營銷"].map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>

            <h4 className="text-[14px] font-bold text-[#7C3AED] mt-6 mb-4">資源</h4>
            <div className="space-y-2">
              {["Blog", "AEO 入門指南", "術語表", "網站地圖", "案例分析"].map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>

            <h4 className="text-[14px] font-bold text-[#7C3AED] mt-6 mb-4">支持機構</h4>
            <div className="space-y-2">
              {["HKSTP Ideation Programme", "Techathon+", "HK PolyU", "HKUST"].map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>

          {/* Logo + social + legal */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                <span className="text-white text-[12px] font-extrabold">S</span>
              </div>
              <span className="text-[18px] font-extrabold tracking-tight">SurfIO</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-5">
              {[
                { label: "YT", href: "#" },
                { label: "in", href: "#" },
                { label: "fb", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>

            <p className="text-[12px] text-gray-400 mb-3">
              &copy; 2026 SurfIO&reg; Inc. 版權所有。
            </p>
            <div className="flex items-center gap-3 text-[12px] text-gray-400 mb-6">
              <a href="#" className="hover:text-white transition-colors">私隱政策</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">條款及細則</a>
            </div>

            {/* Partner badges */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                <span className="text-[7px] text-gray-400 text-center leading-tight font-bold">HKSTP<br/>培育</span>
              </div>
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                <span className="text-[7px] text-gray-400 text-center leading-tight font-bold">Tech<br/>athon+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
