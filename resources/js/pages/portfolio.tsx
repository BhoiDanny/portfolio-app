import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
import Experience from '@/components/portfolio/Experience';
import Hero from '@/components/portfolio/Hero';
import Portfolio from '@/components/portfolio/Portfolio';
import Skills from '@/components/portfolio/Skills';
import HomeLayout from '@/layouts/home-layout';

export default function PortfolioPage() {
    return (
        <HomeLayout>
            <Hero />
            <About />
            <Portfolio />
            <Skills />
            <Experience />
            <Contact />
        </HomeLayout>
    );
}
