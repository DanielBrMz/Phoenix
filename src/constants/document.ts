type TopLevelType = {
    '__GLOBAL_DOCUMENT_CACHE@4'?: Document;
}

let topLevel: TopLevelType = typeof global !== 'undefined' ? global as TopLevelType :
    typeof window !== 'undefined' ? window as TopLevelType : {}
let doccy: Document | undefined;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] as Document;
}

export default doccy;
