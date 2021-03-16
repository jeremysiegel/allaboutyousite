export default class MRSStrings {
  constructor(getExplanations) {
    
    var definitions = {
      bladder: 'The bladder holds urine.',
      epididymis: 'The epididymis stores sperm.',
      prostate: 'The prostate makes fluid to feed the sperm.',
      svesicle: 'The seminal vesicles make fluid to protect the sperm.',
      teste: 'The testicles make sperm and hormones (like testosterone).',
      urethra: 'The urethra transports sperm and urine.',
      vasdeferens: 'The vas deferens transports sperm.'
    } 

    var explanations = {
      bladder: definitions.bladder + ' Sperm do not go in here.',
      epididymis: definitions.epididymis + ' This is where sperm gain the ability to swim.',
      prostate: definitions.prostate + ' Sperm and fluid together is called semen.',
      svesicle: definitions.svesicle + ' This fluid protects sperm from acid in the female reproductive system.',
      teste: definitions.teste + ' They are outside the body because inside it is too warm for sperm to develop.',
      urethra: definitions.urethra + ' Sperm leaving the body is called ejaculation. Sperm and urine cannot leave the body at the same time.',
      vasdeferens: definitions.vasdeferens + ' It brings the sperm inside the body.'
    }

    if (!getExplanations) {
      return definitions;

    } else {
      return explanations;
    }
  }
}