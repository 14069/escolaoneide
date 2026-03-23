import Link from "next/link";

import { school } from "@/lib/school";
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
              Central administrativa
            </span>
            <h1 className="mt-5 font-headline text-4xl font-extrabold text-primary lg:text-5xl">
              Área de gestão das publicações da escola
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              Aqui o responsável pode acessar o painel de conteúdo e manter atualizadas as publicações exibidas no site
              institucional da {school.name}, em {school.city}.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="btn-primary"
                href="http://localhost:3333"
                rel="noreferrer"
                target="_blank"
              >
                Entrar no painel da Sanity
              </a>
              <Link className="btn-secondary" href="/eventos">
                Visualizar publicações no site
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <p className="text-sm font-bold text-secondary">Criar e editar</p>
                <h2 className="mt-3 font-headline text-2xl font-bold text-primary">Publicações completas</h2>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                  Cadastre título, data, local, resumo, capa, galeria de fotos e conteúdo completo em cada evento.
                </p>
              </article>

              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <p className="text-sm font-bold text-secondary">Atualização automática</p>
                <h2 className="mt-3 font-headline text-2xl font-bold text-primary">Mudanças no ar</h2>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                  Quando um evento é publicado, editado ou removido no painel, o site é revalidado automaticamente.
                </p>
              </article>

              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <p className="text-sm font-bold text-secondary">Canal institucional</p>
                <h2 className="mt-3 font-headline text-2xl font-bold text-primary">Escola e comunidade</h2>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                  As publicações abastecem o site e complementam a comunicação da escola com o perfil{" "}
                  <a className="font-bold text-primary hover:underline" href={school.instagramUrl} rel="noreferrer" target="_blank">
                    {school.instagramHandle}
                  </a>
                  .
                </p>
              </article>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Fluxo rápido de uso</h2>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>1. Abra o painel da Sanity em <code>http://localhost:3333</code>.</li>
                  <li>2. Entre com a conta que tem acesso ao projeto <code>{projectId}</code>.</li>
                  <li>3. Crie ou edite documentos do tipo <code>Evento</code>.</li>
                  <li>4. Publique as alterações para que elas apareçam no site.</li>
                  <li>5. Confira o resultado final na página pública de eventos.</li>
                </ol>
              </article>

              <article className="rounded-[1.5rem] bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Status da conexão</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  {configMessage}
                </p>
                {hasSanityEnv && eventCount !== null ? (
                  <p className="mt-3 text-sm font-bold text-primary">Eventos publicados detectados: {eventCount}</p>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  Endereço da escola: {school.address}
                </p>
              </article>
            </div>

            {hasSanityEnv && eventCount === 0 ? (
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-outline-variant bg-surface-container p-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Checklist da primeira publicação</h2>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>1. Abra o painel e faça login normalmente.</li>
                  <li>2. Crie um novo <code>Evento</code>.</li>
                  <li>3. Preencha título, slug, data, local, resumo, capa e conteúdo.</li>
                  <li>4. Se quiser destacar na home, mantenha a opção de exibição ativada.</li>
                  <li>5. Clique em publicar.</li>
                  <li>6. Volte para <code>/</code> e <code>/eventos</code> para conferir o resultado.</li>
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
