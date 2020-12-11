They dashed through the forest in search of the road.

{{#if-has-flag "bothCompanionsAlive"}}
"Do you know your way out of the woods?" asked Lady Willsbourgh.

"Sure!" shouted {{playerName}}.

"If you manage to do so in this darkness," said the minister. "I'll sanctify you!"

"Isn't that a Catholic thing?" asked Lady Willsbourgh.

"I'll covert, even!"

"Well, can you, dear?" asked Lady Willsbourgh to {{playerName}}.

"Convert him? Never tried."

"No! Can you get us to the road in this darkness!" shouted Lady Willsbourgh.
{{else}}
{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"Do you know your way out of the woods?" asked Lady Willsbourgh.

"Sure!" shouted {{playerName}}.

"Even in this darkness?"
{{else}}
"Can you get us to the road?" asked the minister.

"Sure!" shouted {{playerName}}.

"If you can in this darkness, then I'll owe you. Big time!"
{{/if-has-not-flag}}
{{/if-has-flag}}
