const preguntas = [
    {
      id: 1,
      texto: "¿Cómo mejorará esta idea la experiencia de los usuarios finales de la plataforma?",
      opciones: [
        { texto: "Aumentará significativamente la eficiencia o satisfacción del usuario.", impacto: 3, esfuerzo: 0 },
        { texto: "Aumentará moderadamente la eficiencia o satisfacción del usuario.", impacto: 2, esfuerzo: 0 },
        { texto: "Aumentará de forma marginal la eficiencia o satisfacción del usuario.", impacto: 1, esfuerzo: 0 },
        { texto: "No tendrá un impacto notable en la experiencia del usuario.", impacto: 0, esfuerzo: 0 },
      ],
    },
    {
      id: 2,
      texto: "¿Esta idea ayudará a que el producto se diferencie frente a la competencia?",
      opciones: [
        { texto: "Crear una ventaja significativa frente a competidores.", impacto: 3, esfuerzo: 1 },
        { texto: "Crear una ventaja moderada frente a competidores.", impacto: 2, esfuerzo: 1 },
        { texto: "Tendrá un impacto leve en la diferenciación.", impacto: 1, esfuerzo: 0 },
        { texto: "No afectará la diferenciación del producto.", impacto: 0, esfuerzo: 0 },
      ],
    },    
    {
      id: 3,
      texto: "¿Cuál es el nivel de complejidad técnica para implementar esta idea?",
      opciones: [
        { texto: "Muy compleja, requiere varios recursos y nuevas tecnologías.", impacto: 0, esfuerzo: 3 },
        { texto: "Moderadamente compleja, pero factible con tecnología y recursos existentes.", impacto: 0, esfuerzo: 2 },
        { texto: "Simple, utilizando tecnologías ya disponibles.", impacto: 0, esfuerzo: 2 },
        { texto: "No requiere esfuerzos técnicos significativos.", impacto: 0, esfuerzo: 1 },
      ],
    },
    {
      id: 4,
      texto: "¿Qué tan costosa es la implementación de esta idea?",
      opciones: [
        { texto: "Muy costosa en términos de tiempo y recursos.", impacto: 1, esfuerzo: 3 },
        { texto: "Costosa, pero manejable con planificación adecuada.", impacto: 2, esfuerzo: 2 },
        { texto: "De bajo costo y fácilmente manejable.", impacto: 1, esfuerzo: 1 },
        { texto: "Casi sin costo adicional.", impacto: 0, esfuerzo: 0 },
      ],
    },
    {
      id: 5,
      texto: "¿Esta idea está alineada con la estrategia general del negocio?",
      opciones: [
        { texto: "Completamente alineada y refuerza la estrategia.", impacto: 3, esfuerzo: 0 },
        { texto: "Moderadamente alineada con la estrategia.", impacto: 2, esfuerzo: 0 },
        { texto: "Levemente alineada con la estrategia.", impacto: 1, esfuerzo: 0 },
        { texto: "No está alineada con la estrategia actual.", impacto: 0, esfuerzo: 0 },
      ],
    },
    {
      id: 6,
      texto: "¿Se dispone de los recursos humanos y tecnológicos necesarios para llevar a cabo esta idea?",
      opciones: [
        { texto: "No, requerirá la contratación de nuevos recursos o herramientas.", impacto: 1, esfuerzo: 3 },
        { texto: "Parcialmente, pero será necesario un ajuste de los recursos existentes.", impacto: 1, esfuerzo: 2 },
        { texto: "Sí, los recursos ya están disponibles y pueden reasignarse fácilmente.", impacto: 1, esfuerzo: 1 },
        { texto: "Totalmente, los recursos están dedicados y disponibles sin restricciones.", impacto: 1, esfuerzo: 0 },
      ],
    },
    {
      id: 7,
      texto: "Cuánto tiempo se estima que tomará implementar esta idea?",
      opciones: [
        { texto: "Más de 6 meses.", impacto: 1, esfuerzo: 3 },
        { texto: "Entre 3 y 6 meses.", impacto: 2, esfuerzo: 2 },
        { texto: "Entre 1 y 3 meses.", impacto: 2, esfuerzo: 1 },
        { texto: "Menos de 1 mes.", impacto: 1, esfuerzo: 0 },
      ],
    },
    {
      id: 8,
      texto: "¿Qué tan riesgosa es la implementación de esta idea en términos técnicos o funcionales?",
      opciones: [
        { texto: "Muy riesgosa, alto potencial de fallos o errores en el proceso.", impacto: 1, esfuerzo: 3 },
        { texto: "Moderadamente riesgosa, con algunos problemas posibles.", impacto: 2, esfuerzo: 2 },
        { texto: "Levemente riesgosa, pero manejable con controles adecuados.", impacto: 1, esfuerzo: 1 },
        { texto: "Casi sin riesgo de implementación.", impacto: 0, esfuerzo: 0 },
      ],
    },
    {
      id: 9,
      texto: "¿Responde esta idea a una necesidad clara y urgente del mercado?.",
      opciones: [
        { texto: "Es una necesidad urgente y de alta demanda.", impacto: 3, esfuerzo: 0 },
        { texto: "Es una necesidad relevante pero no crítica.", impacto: 2, esfuerzo: 0 },
        { texto: "Es una necesidad marginal o de baja demanda.", impacto: 1, esfuerzo: 0 },
        { texto: "No parece tener demanda clara en el mercado.", impacto: 0, esfuerzo: 0 },
      ],
    },
    {
      id: 10,
      texto: "¿Cómo afectará esta idea la capacidad del producto para escalar a nuevos usuarios o mercados?",
      opciones: [
        { texto: "Aumentará significativamente la escalabilidad del producto.", impacto: 3, esfuerzo: 1 },
        { texto: "Aumentará moderadamente la escalabilidad.", impacto: 2, esfuerzo: 1 },
        { texto: "Tendrá un impacto leve en la escalabilidad.", impacto: 1, esfuerzo: 0 },
        { texto: "No afectará la escalabilidad del producto.", impacto: 0, esfuerzo: 4 },
      ],
    }
    
  ];

  export default preguntas;
