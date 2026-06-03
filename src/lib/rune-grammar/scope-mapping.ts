import React from 'react';
import grammar from './rune.tmLanguage.json';

export interface Token {
  text: string;
  type: string;
}

// Compile regex patterns from the canonical VS Code grammar JSON
const commentsPatternStr = grammar.repository.comments.patterns[0].match;
const keywordsControlStr = grammar.repository.keywords.patterns[0].match;
const keywordsLogicalStr = grammar.repository.keywords.patterns[1].match;
const numbersStr = grammar.repository.numbers.match;
const arithmeticOperatorsStr = grammar.repository.operators.patterns[0].match;
const comparisonOperatorsStr = grammar.repository.operators.patterns[1].match;
const assignmentOperatorsStr = grammar.repository.operators.patterns[2].match;
const functionsStr = grammar.repository.functions.patterns[0].match;
const variablesStr = grammar.repository.variables.patterns[0].match;
const booleansStr = grammar.repository.booleans.match;

// JavaScript regex construction with anchor ^ (must match start of slice)
const regexComments = new RegExp('^' + commentsPatternStr);
const regexKeywordsControl = new RegExp('^' + keywordsControlStr);
const regexKeywordsLogical = new RegExp('^' + keywordsLogicalStr);
const regexNumbers = new RegExp('^' + numbersStr);
const regexArithmetic = new RegExp('^' + arithmeticOperatorsStr);
const regexComparison = new RegExp('^' + comparisonOperatorsStr);
const regexAssignment = new RegExp('^' + assignmentOperatorsStr);
const regexFunctions = new RegExp('^' + functionsStr);
const regexBooleans = new RegExp('^' + booleansStr);
const regexVariables = new RegExp('^' + variablesStr);

// Double-quoted strings with escaped characters
const regexString = /^"([^"\\]|\\.)*(?:["\n]|$)/;

// Python highlighting regex definitions
const pyComments = /^#[^\n]*/;
const pyStrings = /^"""[\s\S]*?"""|^'''[\s\S]*?'''|^"([^"\\]|\\.)*"|^'([^'\\]|\\.)*'/;
const pyKeywords = /^\b(def|class|if|elif|else|while|for|in|return|import|from|as|pass|try|except|raise|and|or|not|is|None|True|False|self|list|dict|set|str|int|float|bool)\b/;
const pyNumbers = /^\b\d+(\.\d+)?\b/;
const pyOperators = /^(==|!=|<=|>=|->|\+=|-=|\*=|\/=|[\+\-\*\/%=<>])/;
const pyFunctions = /^\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/;
const pyVariables = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/;

/**
 * Parses Rune or Python code text into a flat token array using regex rules.
 */
export function tokenizeRune(code: string, lang: string = 'rune'): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const isRune = lang === 'rune';

  while (i < code.length) {
    const remaining = code.slice(i);

    // 1. Whitespace
    const whitespaceMatch = remaining.match(/^\s+/);
    if (whitespaceMatch) {
      tokens.push({ text: whitespaceMatch[0], type: 'plain' });
      i += whitespaceMatch[0].length;
      continue;
    }

    if (isRune) {
      // 2. Comments
      const commentMatch = remaining.match(regexComments);
      if (commentMatch) {
        tokens.push({ text: commentMatch[0], type: 'comment' });
        i += commentMatch[0].length;
        continue;
      }

      // 3. Strings
      const stringMatch = remaining.match(regexString);
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], type: 'string' });
        i += stringMatch[0].length;
        continue;
      }

      // 4. Numbers
      const numberMatch = remaining.match(regexNumbers);
      if (numberMatch) {
        tokens.push({ text: numberMatch[0], type: 'number' });
        i += numberMatch[0].length;
        continue;
      }

      // 5. Operators (Comparison -> Arithmetic -> Assignment)
      const comparisonMatch = remaining.match(regexComparison);
      if (comparisonMatch) {
        tokens.push({ text: comparisonMatch[0], type: 'operator' });
        i += comparisonMatch[0].length;
        continue;
      }

      const arithmeticMatch = remaining.match(regexArithmetic);
      if (arithmeticMatch) {
        tokens.push({ text: arithmeticMatch[0], type: 'operator' });
        i += arithmeticMatch[0].length;
        continue;
      }

      const assignmentMatch = remaining.match(regexAssignment);
      if (assignmentMatch) {
        tokens.push({ text: assignmentMatch[0], type: 'operator' });
        i += assignmentMatch[0].length;
        continue;
      }

      // 6. Functions
      const functionMatch = remaining.match(regexFunctions);
      if (functionMatch) {
        tokens.push({ text: functionMatch[0], type: 'fn' });
        i += functionMatch[0].length;
        continue;
      }

      // 7. Keywords
      const controlMatch = remaining.match(regexKeywordsControl);
      if (controlMatch) {
        tokens.push({ text: controlMatch[0], type: 'keyword' });
        i += controlMatch[0].length;
        continue;
      }

      const logicalMatch = remaining.match(regexKeywordsLogical);
      if (logicalMatch) {
        tokens.push({ text: logicalMatch[0], type: 'keyword' });
        i += logicalMatch[0].length;
        continue;
      }

      // 8. Booleans
      const booleanMatch = remaining.match(regexBooleans);
      if (booleanMatch) {
        tokens.push({ text: booleanMatch[0], type: 'boolean' });
        i += booleanMatch[0].length;
        continue;
      }

      // 9. Variables
      const variableMatch = remaining.match(regexVariables);
      if (variableMatch) {
        tokens.push({ text: variableMatch[0], type: 'variable' });
        i += variableMatch[0].length;
        continue;
      }
    } else {
      // Python highlighting path
      // 2. Comments
      const commentMatch = remaining.match(pyComments);
      if (commentMatch) {
        tokens.push({ text: commentMatch[0], type: 'comment' });
        i += commentMatch[0].length;
        continue;
      }

      // 3. Strings
      const stringMatch = remaining.match(pyStrings);
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], type: 'string' });
        i += stringMatch[0].length;
        continue;
      }

      // 4. Numbers
      const numberMatch = remaining.match(pyNumbers);
      if (numberMatch) {
        tokens.push({ text: numberMatch[0], type: 'number' });
        i += numberMatch[0].length;
        continue;
      }

      // 5. Operators
      const operatorMatch = remaining.match(pyOperators);
      if (operatorMatch) {
        tokens.push({ text: operatorMatch[0], type: 'operator' });
        i += operatorMatch[0].length;
        continue;
      }

      // 6. Functions
      const functionMatch = remaining.match(pyFunctions);
      if (functionMatch) {
        tokens.push({ text: functionMatch[0], type: 'fn' });
        i += functionMatch[0].length;
        continue;
      }

      // 7. Keywords / Builtins
      const keywordMatch = remaining.match(pyKeywords);
      if (keywordMatch) {
        const text = keywordMatch[0];
        let type = 'keyword';
        if (text === 'True' || text === 'False' || text === 'None') {
          type = 'boolean';
        }
        tokens.push({ text, type });
        i += text.length;
        continue;
      }

      // 8. Variables / Identifiers
      const variableMatch = remaining.match(pyVariables);
      if (variableMatch) {
        tokens.push({ text: variableMatch[0], type: 'variable' });
        i += variableMatch[0].length;
        continue;
      }
    }

    // Fallback: consume 1 character
    tokens.push({ text: code[i], type: 'plain' });
    i++;
  }

  return tokens;
}

/**
 * Returns React elements representing highlighted text nodes.
 */
export function renderHighlightedCode(code: string, lang: string = 'rune'): React.ReactNode[] {
  const tokens = tokenizeRune(code, lang);
  return tokens.map((token, index) => {
    if (token.type === 'plain') {
      return token.text;
    }
    const className = `rune-token-${token.type}`;
    return React.createElement('span', { key: index, className }, token.text);
  });
}
