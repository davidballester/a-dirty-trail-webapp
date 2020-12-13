{{#if-has-not-flag "downstairsFromGroundFloor"}}
{{playerName}} descended the stairs, trying not to make them complain under her feet, and failing at that.
{{/if-has-not-flag}}

{{#if-has-flag "bothCompanionsAlive"}}
She got to the floor below. The room that lead to Lady Willsbourgh and the minister's room was closed.
{{else}}
{{#if-has-not-flag "ministerIsDead"}}
She got to the floor below. The room that lead to the minister's room was closed.
{{/if-has-not-flag}}
{{#if-has-not-flag "ladyWillsbourghIsDead"}}
She got to the floor below. The room that lead to Lady Willsbourgh's room was closed.
{{/if-has-not-flag}}
{{/if-has-flag}}

{{#if-has-not-flag "downstairsFromGroundFloor"}}
Below, in the ground level, {{playerName}} could hear movement.
{{/if-has-not-flag}}
