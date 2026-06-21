import './App.css'
import { AddFavoriteModalProvider } from './components/AddFavoriteModal';
import { Clock } from './components/Clock';
import { Date } from './components/Date';
import { Favorites } from './components/Favorites';
import { Greeting } from './components/Greeting';
import { SearchBar } from './components/SearchBar';

function App() {
    return <main className="my-[10dvh] text-bone flex flex-col h-vh mx-[20dvw] items-center justify-center gap-8">
        <AddFavoriteModalProvider>
            <section id="clock" className="w-full flex flex-col align-text-bottom items-center">
                <Greeting />
                <Clock />
                <Date />
            </section>
            <section id="search" className="w-full flex-none">
                <SearchBar />
            </section>
            <section id="shortcuts">
                <Favorites />
            </section>
        </AddFavoriteModalProvider>
    </main>;
}

export default App
