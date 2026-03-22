# ETI Professora Oneide da Cruz Mousinho

Projeto em `Next.js + Sanity` preparado para:

- administrador publicar eventos
- exibir card na página inicial
- abrir página interna completa do evento
- mostrar capa, resumo, texto e galeria de fotos

## Estrutura criada

- `app/page.tsx`: home com cards dos eventos
- `app/eventos/page.tsx`: arquivo completo dos eventos
- `app/eventos/[slug]/page.tsx`: página interna de cada evento
- `app/admin/page.tsx`: instruções e atalho para o painel do admin
- `sanity/schemaTypes/eventType.ts`: schema do tipo `evento`
- `app/api/revalidate/route.ts`: rota pronta para revalidação via webhook

## Como rodar

1. Entre na pasta do projeto:

```bash
cd /home/agacy-junior/Downloads/template_eti_oneide_mosinho/oneide-next-sanity
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

3. Preencha no `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_REVALIDATE_SECRET`

As variáveis `SANITY_STUDIO_*` já podem apontar para as `NEXT_PUBLIC_*` dentro do próprio arquivo, então você não
precisa repetir os mesmos valores manualmente.

4. Rode o projeto:

```bash
npm run dev
```

5. Rode o painel do administrador em outro terminal:

```bash
npm run studio
```

6. Abra no navegador:

- site: `http://localhost:3000`
- admin: `http://localhost:3333`

## Como o admin publica

1. Acessa o Sanity Studio em `http://localhost:3333`
2. Cria um novo documento do tipo `Evento`
3. Preenche:
   - título
   - slug
   - data do evento
   - local
   - resumo do card
   - foto de capa
   - galeria
   - conteúdo completo
   - opção de mostrar na home
4. Publica o documento

## Webhook de revalidação

Para o site atualizar automaticamente depois de publicar ou editar um evento:

1. Deixe o `SANITY_REVALIDATE_SECRET` configurado no ambiente do site.
2. No Sanity Manage, abra `API > Webhooks`.
3. Crie um webhook com estes valores:

- URL: `https://SEU-DOMINIO/api/revalidate`
- Method: `POST`
- Trigger on: `create`, `update`, `delete`
- Filter: `_type == "event"`
- Drafts: desativado
- HTTP header: `x-revalidate-secret: SEU_SANITY_REVALIDATE_SECRET`
- Projection:

```groq
{
  "slug": coalesce(after().slug.current, before().slug.current),
  "previousSlug": select(
    before().slug.current != after().slug.current => before().slug.current
  )
}
```

Depois disso, o webhook vai revalidar:

- `/`
- `/eventos`
- `/eventos/[slug]`

## Observação importante

Enquanto o Sanity não estiver configurado, o projeto usa eventos de exemplo para a interface continuar funcionando em modo demonstração.
