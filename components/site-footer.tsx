export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface-container">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">ETI Prof. Oneide da Cruz Mousinho</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Estrutura preparada para o administrador publicar eventos com capa, resumo, conteúdo completo e galeria.
          </p>
        </div>
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Fluxo</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            O visitante vê o card na home, clica no post e acessa a página interna com todas as fotos e informações do
            evento ocorrido.
          </p>
        </div>
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Administração</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            O schema <code>evento</code> já foi modelado e o administrador publica pelo Sanity Studio, rodando em
            separado na porta <code>3333</code>.
          </p>
        </div>
      </div>
    </footer>
  );
}
