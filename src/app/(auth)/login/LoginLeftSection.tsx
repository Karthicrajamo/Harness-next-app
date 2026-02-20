"use client";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const FEATURES = [
  {
    icon: "pi-chart-bar",
    title: "Real-time Analytics",
    desc: "Monitor production metrics",
  },
  {
    icon: "pi-shield",
    title: "Quality Control",
    desc: "ISO compliance tracking",
  },
  {
    icon: "pi-bolt",
    title: "Production Management",
    desc: "Streamlined workflows",
  },
  {
    icon: "pi-users",
    title: "Team Collaboration",
    desc: "Cross-department coordination",
  },
];

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-default group">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
        <i className={`pi ${icon} text-white text-lg`}></i>
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-blue-200/80 text-xs">{desc}</p>
      </div>
    </div>
  );
};

export default function LoginLeftSection() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center p-8 text-white w-full h-full">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative w-16 h-16 bg-white/20 rounded-2xl overflow-hidden">
              <Image
                src="/assets/harness.png"
                alt="Harness Logo"
                fill
                className="object-cover p-3"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Harness ERP</h1>
              <p className="text-blue-100/90 text-base mt-1 font-light">
                Enterprise Resource Planning
              </p>
            </div>
          </div>

          <p className="text-base mb-6 text-blue-100/90 leading-relaxed font-light">
            Optimize your manufacturing workflow with intelligent enterprise
            solutions.
          </p>
          <div className="space-y-4">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
