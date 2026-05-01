export default function History() {
  const milestones = [
    { year: "1969", title: "Założenie Lodziarni", desc: "Początek tradycji rodzinnej pod kierownictwem Janusza Romanowskiego." },
    { year: "1998", title: "Piekarnia", desc: "Dywersyfikacja asortymentu i budowa drugiego zakładu produkcyjnego." },
    { year: "2011", title: "Pierwsza Cukieteria", desc: "Przejście do modelu nowoczesnych lokali kawiarnianych w Ostrołęce." },
    { year: "2012", title: "Poezja Smaku", desc: "Powstanie marki specjalizującej się w tortach artystycznych." },
  ];

  return (
    <section id="nasza-historia" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-transcendent-pink/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Using a placeholder for historical bakery photo */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2000&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-[#2b2b4d]/20 mix-blend-multiply"></div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/50">
              <h3 className="font-serif text-2xl text-future-dusk font-bold mb-2">Tradycja z serca Goworowa</h3>
              <p className="text-slate-600">Od 1969 roku wierzymy, że najlepsze wypieki rodzą się z połączenia cierpliwości, rodzinnych receptur i najlepszych składników.</p>
            </div>
          </div>

          {/* Text and Timeline Side */}
          <div>
            <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block">Nasze Korzenie</span>
            <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-8 leading-tight">
              Od małej zielonej lodziarni<br/>do 22 lokalizacji
            </h2>
            <p className="text-lg text-slate-600 mb-12 font-light leading-relaxed">
              Wszystko zaczęło się od małej lodziarni Janusza Romanowskiego, która stała się symbolem radosnych niedziel dla mieszkańców regionu. 
              Dziś, pod okiem Jacka i Marcina Romanowskich, kontynuujemy to dziedzictwo, dostarczając codziennie świeże pieczywo i artystyczne torty „Poezja Smaku”.
            </p>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-bakery-gold/30 before:to-transparent">
              {milestones.map((item) => (
                <div key={item.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-transcendent-pink text-future-dusk shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="w-2 h-2 rounded-full bg-bakery-gold"></span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover-lift">
                    <div className="font-serif text-2xl font-bold text-bakery-gold mb-1">{item.year}</div>
                    <h4 className="font-bold text-future-dusk text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
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