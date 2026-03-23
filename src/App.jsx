import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { percent: "23%", desc: "Decrease in customer calls" },
  { percent: "27%", desc: "Efficiency improved" },
  { percent: "40%", desc: "Better performance" },
];

const CAR_IMAGE =
  "https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png";

export default function App() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef([]);
  const scrollRef = useRef(null);
  const glowRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: "power3.out" });

      
      tl.fromTo(
        charsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
        }
      );

      
      tl.fromTo(
        statsRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, stagger: 0.1 },
        "-=0.4"
      );

      
      tl.fromTo(
        carRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.5"
      );

      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1 });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  
  useEffect(() => {
    const ctx = gsap.context(() => {

     
      gsap.to(carRef.current, {
        x: "30%",
        rotation: 8,
        scale: 0.82,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

     
      gsap.to(glowRef.current, {
        x: "20%",
        opacity: 0,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

     gsap.to(charsRef.current, {
    
  opacity: 0,
  y: -60,
  scale: 0.96,
  stagger: {
    each: 0.03,
    from: "center"
  },
  ease: "power2.out",   
  scrollTrigger: {
    trigger: heroRef.current,
    start: "35% top",   
    end: "95% top",     
    scrub: 1.5,         
  },
});
      
      gsap.to(statsRef.current, {
        opacity: 0,
        x: 60,
        stagger: 0.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "15% top",
          end: "60% top",
          scrub: 1.2,
        },
      });

      
      gsap.to(scrollRef.current, {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "20% top",
          scrub: 1,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="hero-section" ref={heroRef}>
        <div className="grid-overlay" />
        <div className="glow-ring" ref={glowRef} />

       
        <div className="headline-container">
          <h1 className="headline-text">
            {"WELCOME ITZFIZZ".split("").map((char, i) => (
              <span
                key={i}
                className="char"
                ref={(el) => (charsRef.current[i] = el)}
              >
                {char === " " ? "\u00A0\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        
        <div className="car-wrapper" ref={carRef}>
          <img src={CAR_IMAGE} alt="car" draggable={false} />
        </div>

       
        <div className="stats-container">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-item"
              ref={(el) => (statsRef.current[i] = el)}
            >
              <div className="stat-percent">{s.percent}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>

       
        <div className="scroll-indicator" ref={scrollRef}>
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="below-section">
        <div className="below-content">
          <h2>
            BUILT FOR <span className="accent">SPEED</span>
          </h2>
          <p>
            Every pixel, every motion crafted for performance.<br />
            Smooth, scroll-driven animations.<br />
            <span className="accent">Precision. Fluidity. Experience.</span>
          </p>
        </div>
      </section>
    </main>
  );
}