import * as DeckTypings from "@danmarshall/deckgl-typings"
declare module "deck.gl" {
    export namespace DeckTypings {}
}

import { ReactNode } from 'react';

interface DeckGLProps {
  children: ReactNode;
  // otras propiedades de DeckGL...
}

const DeckGL: React.FC<DeckGLProps> = ({ children, ...props }) => {
  // tu implementación de DeckGL...
};s

export default DeckGL;