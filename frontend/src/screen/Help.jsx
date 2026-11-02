import React from 'react';

const Help = () => {
  const faqs = [
    {
      q: "📸 How should I take the photo of my cattle?",
      a: "Make sure the cattle is clearly visible in the frame. Good lighting and side-view images work best for breed identification. Ensure there's minimal background noise or other animals in the shot."
    },
    {
      q: "⚠️ I uploaded an image but got 'Failed to get prediction'. Why?",
      a: "This can happen if the image is too blurry, doesn't contain a visible cattle, or isn't of a supported breed. Try retaking the photo with better lighting and a clearer focus on the animal."
    },
    {
      q: "💡 What kind of cattle breeds can be detected?",
      a: "The AI currently supports major cattle breeds like Holstein, Jersey, Angus, Hereford, Guernsey, and more. We are constantly updating our model to support more breeds."
    },
    {
      q: "📥 Can I see my previous results?",
      a: "Yes! Once logged in, you can access your complete classification history from the 'History' tab in the navigation menu."
    },
    {
      q: "🧪 Is this a certified breed identification?",
      a: "This is an AI-powered assistant tool designed for informational purposes. For official breed certification or medical advice, please consult a certified livestock specialist or veterinarian."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Help Center
          </div>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">FAQs</span></h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">Everything you need to know about getting the best results from the Cattle Breed Classifier.</p>
        </div>

        <div className="space-y-6 mb-20">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-amber-500/30">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none font-bold text-white hover:text-amber-500 transition-colors">
                <span className="text-xl pr-4 leading-tight">{faq.q}</span>
                <span className="bg-white/5 p-3 rounded-2xl group-open:rotate-180 group-open:bg-amber-500 group-open:text-slate-900 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-8 pb-8 text-slate-400 leading-relaxed font-medium text-lg border-t border-white/5 pt-6">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-white/10">
          {/* Internal decorative element */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full translate-x-20 -translate-y-20 blur-[60px]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full -translate-x-20 translate-y-20 blur-[60px]"></div>
          
          <div className="relative z-10">
            <div className="bg-amber-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-amber-500/20 rotate-3">
              <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tight">Still need help?</h2>
            <p className="text-slate-400 mb-10 text-xl font-medium max-w-md mx-auto leading-relaxed">Our support team is ready to help you with any questions or technical issues.</p>
            <div className="inline-block bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-amber-500 font-black text-2xl mb-1 tracking-tight group-hover:scale-105 transition-transform">support@cattlebreedclassifier.com</p>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Typical response time: 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
