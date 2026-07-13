import type { Metadata } from 'next';
import { V2LayoutClient } from './V2LayoutClient';
import './v2.css';

export const metadata: Metadata = {
  title: 'KUROSEI® — Digital Production Studio',
  description:
    'KUROSEI is a creative studio crafting digital experiences through design, development, and motion. Based in Tokyo, working worldwide.',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <V2LayoutClient>{children}</V2LayoutClient>;
}
