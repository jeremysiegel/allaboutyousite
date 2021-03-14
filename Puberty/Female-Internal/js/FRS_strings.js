export default class FRSStrings {
  constructor(getExplanations) {
    
    var definitions = {
      fTubes: 'The Fallopian tubes are a passage from the ovary to the uterus.',
      ovaries: 'The ovaries make eggs and hormones (like estrogen).',
      uterus: 'The uterus is where the fetus (growing baby) develops.',
      vagina: 'The vagina is a passage for period flow and the baby.',
      cervix: 'The cervix is a gateway to the uterus.'
    } 

    var explanations = {
      fTubes: definitions.fTubes + ' They are where egg and sperm meet and the egg is fertilized.',
      ovaries: definitions.ovaries + ' One egg is released each menstrual cycle (about once per month).',
      uterus: definitions.uterus + ' Each cycle, a lining builds up. If the egg is fertilized, the embryo (fertilized egg) will implant here, and the lining will nourish it through the first part of pregnancy. Otherwise, the lining gets shed and leaves the body during the period.',
      vagina: definitions.vagina + ' During sexual intercourse, this is where sperm enters the body.',
      cervix: definitions.cervix + ' During some parts of the menstrual cycle, a thick mucus made by the cervix prevents sperm from entering the uterus.'
    }

    if (!getExplanations) {
      return definitions;

    } else {
      return explanations;
    }
  }
}