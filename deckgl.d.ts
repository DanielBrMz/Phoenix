import * as DeckTypings from "@danmarshall/deckgl-typings";
import { ReactNode } from 'react';

declare module "deck.gl" {
    export namespace DeckTypings {
        interface DeckGLProps extends React.PropsWithChildren<{}> {
            // otras propiedades de DeckGL...
        }

        const DeckGL: React.FC<DeckGLProps> = ({ children, ...props }) => {
            // tu implementación de DeckGL...
        };

        export default DeckGL;
    }
}
