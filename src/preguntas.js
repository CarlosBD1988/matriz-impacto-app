const preguntas = [
    {
      id: 1,
      texto: "¿Qué tanto contribuye esta propuesta a los objetivos estratégicos de la empresa?",
      opciones: [
        { texto: "Alineado completamente a la estrategia (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Alineado parcialmente a la estrategia (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Alineado mínimamente a la estrategia (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Cero alineación a la estrategia (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 2,
      texto: "¿Cuánto valor le genera al cliente esta propuesta?",
      opciones: [
        { texto: "Valor significativo para el cliente (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Valor moderado para el cliente (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Valor mínimo para el cliente (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "No genera valor para el cliente (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    // Agregamos más preguntas de la misma manera
    {
      id: 3,
      texto: "¿Qué tan innovadora es la propuesta?",
      opciones: [
        { texto: "Innovación disruptiva (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Innovación incremental (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Poco innovadora (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Nada innovadora (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 4,
      texto: "¿Qué tan viable es técnicamente la propuesta?",
      opciones: [
        { texto: "Altamente viable (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Moderadamente viable (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Poco viable (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Nada viable (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 5,
      texto: "¿Cuál es el riesgo asociado a esta propuesta?",
      opciones: [
        { texto: "Riesgo bajo (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Riesgo moderado (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Riesgo alto (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Riesgo muy alto (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    // Añadimos más preguntas según sea necesario
  ];

  export default preguntas;
