import LocalizedStrings from 'react-localization';


const loginTransle = new LocalizedStrings({
    us: {
        welcomeTitle: "Welcome back",
        description: "We specialize in providing and managing global communications for multinational companies. We take away the pain!"
    },
    es: {
        welcomeTitle: "Bienvenido de nuevo",
        description: "Nos especializamos en proporcionar y administrar comunicaciones globales para empresas multinacionales. ¡Quitamos el dolor!"
    }
});

const homePageTranslate = new LocalizedStrings({
    us: {
        title: "Hello Title"
    },
    es: {
        title: "Hello Title"
    }
});

export {
    loginTransle,
    homePageTranslate
}