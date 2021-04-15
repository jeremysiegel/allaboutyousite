export default class hormonesStrings {
  constructor(get) {

    var questions = [
      [
        "Q: When does puberty start?\n\nA: Puberty usually begins between ages 9-16. It is perfectly normal for one person to start puberty before 10, and their friend or classmate to start in their teens. Everyone ends up going through the changes at some point and comes out a normal adult."
      ],
      [
        "\nQ: How long does puberty last?\n\nA: Puberty can last anywhere from 2-5 years. That is for all the changes to happen. That might seem like a long time, but it won't 'feel' the same for that entre time. Some of the changes are slow, and others are fast. Things that might sound scary now will become normal."
      ],
      [
        "\nQ: Why is going through puberty different for everyone?\n\nA: There's a lot that's the same for everyone going through puberty (getting taller, feeling new feelings), and a lot that is different (when the changes happen or things like exactly how tall you get). Some of it is genetics: humans all look different, and puberty is just one of those things that can be different. The important thing to know is that everyone's puberty is normal for them. Even though everyone is different, that is totally normal when it comes to puberty. It is important to remember that you and other people your age are going through the same things, and to be nice to eachother."
      ]
    ]

    if (get === 'definitions') {
      return definitions;
    } else if (get === 'questions') {
      return questions;
    }
  }
}