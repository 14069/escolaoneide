import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hasSanityEnv, projectId } from "@/sanity/env";
import { getEventCount } from "@/sanity/lib/events";

export default async function AdminPage() {
  const eventCount = hasSanityEnv ? await getEventCount() : null;
  const configMessage = !hasSanityEnv
    ? "O projeto ainda está em modo demonstração. Preencha primeiro o .env.local para conectar o site e o Studio ao seu projeto Sanity."
    : eventCount === null
      ? "As variáveis do Sanity estão presentes, mas a leitura do dataset falhou. Vale conferir login, permissões e disponibilidade do projeto."
      : eventCount === 0
        ? "Conexão com o Sanity confirmada. O próximo passo é publicar o primeiro evento para ele aparecer no site."
        : `Conexão confirmada com ${eventCount} evento(s) publicado(s). O site já pode listar esse conteúdo.`;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-10 lg:py-16">
          <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft lg:p-10">
            <span className="rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
              Painel do administrador
            </span>
            <h1 className="mt-5 font-headline text-4xl font-extrabold text-primary lg:text-5xl">
              O site em Next.js consome os eventos, e o admin publica pelo Sanity Studio.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              Para evitar problemas de build do Studio embutido no Next 16, o painel foi preparado para rodar como uma
              aplicação Sanity separada, usando o mesmo schema <code>evento</code> que já está neste projeto.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Como abrir o painel local</h2>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>1. Em um terminal, rode <code>npm run studio</code>.</li>
                  <li>2. O admin abrirá em <code>http://localhost:3333</code>.</li>
                  <li>3. Crie ou edite os eventos no tipo <code>Evento</code>.</li>
                  <li>4. O site em Next.js lê esse conteúdo e exibe na home e nas páginas internas.</li>
                </ol>
              </article>

              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Estado atual da configuração</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  {configMessage}
                </p>
                {hasSanityEnv && eventCount !== null ? (
                  <p className="mt-3 text-sm font-bold text-primary">Eventos publicados detectados: {eventCount}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    className="btn-primary"
                    href="http://localhost:3333"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Abrir Studio local
                  </a>
                  <Link className="btn-secondary" href="/eventos">
                    Ver eventos no site
                  </Link>
                </div>
              </article>
            </div>

            {hasSanityEnv && eventCount === 0 ? (
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-outline-variant bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Checklist para o primeiro teste</h2>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>
                    1. Abra o Studio e faça login na conta que tem acesso ao projeto <code>{projectId}</code>.
                  </li>
                  <li>2. Crie um documento do tipo <code>Evento</code> e preencha título, slug, data, resumo, capa e conteúdo.</li>
                  <li>3. Clique em publicar no topo do documento.</li>
                  <li>4. Volte para <code>/</code> e <code>/eventos</code>; o conteúdo deve aparecer após a publicação.</li>
                </ol>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
