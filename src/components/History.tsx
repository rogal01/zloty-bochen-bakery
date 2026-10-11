export default function History() {
  const milestones = [
    { year: "1989", title: "Pierwszy piec szamotowy", desc: "Założenie piekarni przez rodzinę Romanowskich na Warmii. Narodziny 35-letniego zakwasu żytniego, który pielęgnujemy do dziś." },
    { year: "2004", title: "Manufaktura Tortów Artystycznych", desc: "Dołączenie mistrzów cukiernictwa: start autorskiej linii tortów weselnych, monoporcji i naturalnych musów z owoców leśnych." },
    { year: "2016", title: "Sieć 6 Pracowni Rzemieślniczych", desc: "Otwarcie lokalnych pracowni w Nowych Brzegach, Słonecznej, Młynarach i Lipowym Polu, by pieczywo trafiało do Klientów prosto z pieca." },
    { year: "2026", title: "Konfigurator 3D i Świeże Wypieki", desc: "Połączenie bezkompromisowej tradycji wypieku z nowatorskim narzędziem do projektowania tortów artystycznych online." },
  ];

  return (
    <section id="nasza-historia" className="py-24 bg-white relative overflow-hidden scroll-mt-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-transcendent-pink/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2000&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-[#2b2b4d]/20 mix-blend-multiply" />
            </div>
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-md">
              <h3 className="font-serif text-2xl text-future-dusk font-bold mb-2">35 Lat Wierni Tradycji</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Piekarnia Romanowski to rodzinna manufaktura z Warmii, gdzie czas dojrzewania ciasta i szacunek do ziarna są ważniejsze od pośpiechu.
              </p>
            </div>
          </div>

          <div>
            <span className="text-bakery-gold uppercase tracking-widest text-xs font-bold mb-3 block">
              Dziedzictwo Rzemiosła & Pasja
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-6 leading-tight">
              Od pierwszego bochenka<br />do mistrzowskiego cukiernictwa
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-10 font-light leading-relaxed">
              Nie szukamy dróg na skróty. Nasz zakwas ma ponad 35 lat, mąka pochodzi z tradycyjnych młynów żarnowych, 
              a torty artystyczne przygotowujemy wyłącznie na prawdziwej śmietance 36% i belgijskiej czekoladzie.
            </p>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-bakery-gold/30 before:to-transparent">
              {milestones.map((item) => (
                <div key={item.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-transcendent-pink text-future-dusk shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="w-2 h-2 rounded-full bg-bakery-gold" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover-lift">
                    <div className="font-serif text-2xl font-bold text-bakery-gold mb-1">{item.year}</div>
                    <h4 className="font-bold text-future-dusk text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

