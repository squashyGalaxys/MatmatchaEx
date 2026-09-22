import { useState } from 'react';

export default function App() {
    const [store, setStore] = useState('Willys');
    const [days, setDays] = useState(3);
    const [peopleCount, setPeopleCount] = useState(2);

    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState('generator');

    const handleGenerateMealPlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5177/api/MealPlanner/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store: store,
                    days: parseInt(days, 10),
                    peopleCount: parseInt(peopleCount, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Det gick inte att generera matsedeln. Kontrollera API:et');
            }

            const data = await response.json();
            setMealPlan(data);
        } catch (err) {
            console.error('Fel vid generering:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
            {/* Header & Meny */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('generator')}>
                        
                        <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                            MatMatcha
                        </span>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <button
                            onClick={() => setActiveTab('generator')}
                            className={`transition-colors cursor-pointer ${activeTab === 'generator' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600'}`}
                        >
                            Veckomeny
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`transition-colors cursor-pointer ${activeTab === 'about' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600'}`}
                        >
                            Om oss
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600'}`}
                        >
                            Kontakt
                        </button>
                    </nav>
                </div>
            </header>

            
            <main className="flex-grow max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">

                {activeTab === 'about' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-2xl font-bold text-emerald-700">Om MatMatcha</h2>
                        <p className="text-slate-600 leading-relaxed">
                            MatMatcha är en webbapplikation framtagen som ett examensarbete. Målet är att hjälpa hushåll spara både tid och pengar genom att automatiskt matcha veckans aktuella butikserbjudanden (från bl.a. Willys och ICA) med goda, skalbara recept.
                            I framtiden är även tanken att integrera AI och kunna anpassa sin handling ännumer men tex alergener eller vad för typ av recept man önskar. 
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Genom att kombinera C# .NET som backend med ett modernt och responsivt React-gränssnitt skapas en skräddarsydd inköpslista helt anpassad efter din plånbok och familjestorlek.
                        </p>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-2xl font-bold text-emerald-700">Kontakt</h2>
                        <p className="text-slate-600">
                            Har du frågor om projektet eller vill veta mer om hur MatMatcha fungerar? Tveka inte att höra av dig!
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-fit text-sm">
                            <p> E-post: <span className="font-semibold text-emerald-700">kontakt@matmatcha.se</span></p>
                            <p> Ort: Sverige</p>
                        </div>
                    </div>
                )}

                {activeTab === 'generator' && (
                    <>
                        <div className="text-center max-w-2xl mx-auto mb-6">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Veckomenyn som sparar tid och pengar
                            </h1>
                            <p className="text-slate-600 mt-2">
                                Välj butik, antal dagar och personer och låt oss göra resten.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">
                                Anpassa din handling
                            </h2>

                            <form onSubmit={handleGenerateMealPlan} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        1. Välj butik
                                    </label>
                                    <select
                                        value={store}
                                        onChange={(e) => setStore(e.target.value)}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="Willys">Willys</option>
                                        <option value="ICA">ICA Supermarket</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        2. Antal dagar
                                    </label>
                                    <select
                                        value={days}
                                        onChange={(e) => setDays(e.target.value)}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="1">1 dag</option>
                                        <option value="2">2 dagar</option>
                                        <option value="3">3 dagar</option>
                                        <option value="4">4 dagar</option>
                                        <option value="5">5 dagar</option>
                                        <option value="6">6 dagar</option>
                                        <option value="7">7 dagar</option>
                                        <option value="8">8 dagar</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        3. Antal personer
                                    </label>
                                    <select
                                        value={peopleCount}
                                        onChange={(e) => setPeopleCount(e.target.value)}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="1">1 person</option>
                                        <option value="2">2 personer</option>
                                        <option value="3">3 personer</option>
                                        <option value="4">4 personer</option>
                                        <option value="5">5 personer</option>
                                        <option value="6">6 personer</option>
                                        <option value="7">7 personer</option>
                                        <option value="8">8 personer</option>
                                    </select>
                                </div>

                                <div className="md:col-span-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? 'Matchar erbjudanden...' : 'Generera Veckomeny '}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {mealPlan && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-4">
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Förslag på måltider för {mealPlan.days} {mealPlan.days === 1 ? 'dag' : 'dagar'} och {peopleCount} personer
                                    </h2>

                                    {mealPlan.recipes.map((recipe, index) => (
                                        <div key={recipe.id || index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                                                    Middag {index + 1}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {recipe.prepTimeMinutes} min
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">{recipe.title}</h3>
                                            <p className="text-sm text-slate-600 mb-3">{recipe.description}</p>

                                            <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                                                <span className="font-semibold text-slate-700">Ingredienser i receptet:</span>{' '}
                                                {recipe.ingredients.map((ing) => ing.name).join(', ')}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-fit">
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">
                                        Inköpslista
                                    </h2>
                                    <p className="text-xs text-slate-500 mb-4">
                                        Beräknat för {mealPlan.peopleCount} {mealPlan.peopleCount === 1 ? 'person' : 'personer'}
                                    </p>

                                    <ul className="divide-y divide-slate-100">
                                        {mealPlan.shoppingList.map((item, index) => (
                                            <li key={index} className="py-2.5 flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                                    {item.isOnOffer && (
                                                        <span className="inline-block text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded mt-0.5">
                                                            Erbjudande ({item.offerPrice} kr)
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                                    {item.amountPerPerson} {item.unit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
                <p>© 2026 MatMatcha.</p>
            </footer>
        </div>
    );
}
                