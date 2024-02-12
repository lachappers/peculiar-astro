export { renderers } from '../renderers.mjs';
import 'react';
import 'react-dom/server';
import '../chunks/1707728410672/astro.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';
import 'html-escaper';

const page = () => import('../chunks/1707728410672/prerender.mjs').then(n => n.estimate);

export { page };
