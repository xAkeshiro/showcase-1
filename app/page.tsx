import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { News } from '@/components/sections/News';
import { Characters } from '@/components/sections/Characters';
import { World } from '@/components/sections/World';
import { Media } from '@/components/sections/Media';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <News />
        <Characters />
        <World />
        <Media />
      </main>
      <Footer />
    </>
  );
}
