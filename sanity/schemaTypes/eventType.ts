import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required().min(6),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Data do evento",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Local",
      type: "string",
      description: "Ex.: Auditório da escola, Araguatins - TO",
    }),
    defineField({
      name: "excerpt",
      title: "Resumo para o card",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(24).max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Foto de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Conteúdo completo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
          ],
          lists: [{ title: "Lista", value: "bullet" }],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showOnHome",
      title: "Mostrar na página inicial",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "eventDate",
    },
    prepare({ title, media, subtitle }) {
      const label = subtitle
        ? new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "America/Araguaina",
          }).format(new Date(subtitle))
        : "Sem data";

      return {
        title,
        media,
        subtitle: `Evento • ${label}`,
      };
    },
  },
});
