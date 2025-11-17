"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  Sword,
  Brain,
} from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  mainIdeas: string[];
  imageUrl: string;
  affiliateLink: string;
  price: string;
}

const books: Book[] = [
  {
    id: "1", // Mantive o ID '1' para o seu livro, mas você pode mudar se tiver mais.
    title:
      "Mais Esperto Que O Diabo - Livro De Bolso: O Mistério Revelado Da Liberdad...",
    author: "Napoleon Hill",
    description:
      'Neste livro extraordinário, Napoleon Hill revela os segredos que o impediam de alcançar a liberdade pessoal, oferecendo uma entrevista exclusiva com o "Diabo" que ficou oculta por décadas. Uma obra essencial para quem busca superar medos e limitações.',
    mainIdeas: [
      "Domine o medo e a indecisão",
      "Liberte-se de hábitos destrutivos",
      'Desvende os truques do "Diabo" (resistência interna)',
      "Alcance a verdadeira liberdade pessoal e sucesso",
    ],
    imageUrl: "/images/mais-esperto-que-o-diabo.png", // URL da sua imagem
    affiliateLink: "https://mercadolivre.com/sec/1bCtE4x", // Seu link de afiliado
    price: "R$ 19", // O preço que você mencionou
  },
];

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedFavorites = localStorage.getItem("devaneios-favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (bookId: string) => {
    const newFavorites = favorites.includes(bookId)
      ? favorites.filter((id) => id !== bookId)
      : [...favorites, bookId];

    setFavorites(newFavorites);
    localStorage.setItem("devaneios-favorites", JSON.stringify(newFavorites));
  };

  const shareOnSocial = (platform: string, book: Book) => {
    const text = `Confira "${book.title}" de ${
      book.author
    } - ${book.description.substring(0, 100)}...`;
    const url = window.location.href;

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-gray-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                Devaneios
              </h1>
              <Sword className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 font-serif">
              Filosofia, Estratégia e Sabedoria Atemporal
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Descubra os clássicos que moldaram o pensamento sobre poder,
              guerra e existência. Obras que transcendem o tempo e continuam
              relevantes para líderes, estrategistas e pensadores.
            </p>
          </div>
        </div>
      </header>

      {/* Books Section */}
      <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
              Biblioteca Essencial
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Cada obra selecionada oferece insights profundos sobre estratégia,
              poder e a natureza humana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Book Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-900">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-all duration-300"
                    aria-label={
                      favorites.includes(book.id)
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <Heart
                      className={`w-6 h-6 transition-all duration-300 ${
                        favorites.includes(book.id)
                          ? "fill-red-600 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Book Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                      {book.title}
                    </h3>
                    <p className="text-red-500 font-semibold text-sm sm:text-base">
                      {book.author}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Main Ideas */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                      Principais Ideias:
                    </h4>
                    <ul className="space-y-2">
                      {book.mainIdeas.map((idea, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <span className="text-red-600 mt-1">▸</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-red-500">
                        {book.price}
                      </span>
                    </div>

                    <a
                      href={book.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-red-900/50"
                    >
                      Comprar Agora
                    </a>

                    {/* Social Share */}
                    <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-700">
                      <span className="text-xs text-gray-500 mr-1">
                        Compartilhar:
                      </span>
                      <button
                        onClick={() => shareOnSocial("facebook", book)}
                        className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300"
                        aria-label="Compartilhar no Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareOnSocial("twitter", book)}
                        className="p-2 bg-gray-700 hover:bg-sky-500 rounded-lg transition-all duration-300"
                        aria-label="Compartilhar no Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareOnSocial("linkedin", book)}
                        className="p-2 bg-gray-700 hover:bg-blue-700 rounded-lg transition-all duration-300"
                        aria-label="Compartilhar no LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="mt-16 sm:mt-20 p-6 sm:p-8 bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-2xl border border-red-900/30">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
                <Heart className="w-7 h-7 fill-red-600 text-red-600" />
                Seus Favoritos ({favorites.length})
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Você marcou {favorites.length}{" "}
                {favorites.length === 1 ? "livro" : "livros"} como favorito.
                Suas preferências são salvas automaticamente.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl sm:text-3xl font-bold">Devaneios</h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Conectando mentes curiosas aos clássicos da filosofia e estratégia
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <a
                href="https://facebook.com/devaneios"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300"
                aria-label="Visite nossa página no Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/devaneios"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-sky-500 rounded-full transition-all duration-300"
                aria-label="Siga-nos no Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/devaneios"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-blue-700 rounded-full transition-all duration-300"
                aria-label="Conecte-se no LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2024 Devaneios. Todos os direitos reservados. | Links de
              afiliados Amazon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
