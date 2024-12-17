!(function () {
  function e(e) {
    return {
      aliases: ["adoc"],
      contains: [
        e.COMMENT("^/{4,}\\n", "\\n/{4,}$", { relevance: 10 }),
        e.COMMENT("^//", "$", { relevance: 0 }),
        { className: "title", begin: "^\\.\\w.*$" },
        { begin: "^[=\\*]{4,}\\n", end: "\\n^[=\\*]{4,}$", relevance: 10 },
        {
          className: "section",
          relevance: 10,
          variants: [
            { begin: "^(={1,5}) .+?( \\1)?$" },
            { begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$" },
          ],
        },
        {
          className: "meta",
          begin: "^:.+?:",
          end: "\\s",
          excludeEnd: !0,
          relevance: 10,
        },
        { className: "meta", begin: "^\\[.+?\\]$", relevance: 0 },
        {
          className: "quote",
          begin: "^_{4,}\\n",
          end: "\\n_{4,}$",
          relevance: 10,
        },
        {
          className: "code",
          begin: "^[\\-\\.]{4,}\\n",
          end: "\\n[\\-\\.]{4,}$",
          relevance: 10,
        },
        {
          begin: "^\\+{4,}\\n",
          end: "\\n\\+{4,}$",
          contains: [
            { begin: "<", end: ">", subLanguage: "xml", relevance: 0 },
          ],
          relevance: 10,
        },
        { className: "bullet", begin: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+" },
        {
          className: "symbol",
          begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
          relevance: 10,
        },
        {
          className: "strong",
          begin: "\\B\\*(?![\\*\\s])",
          end: "(\\n{2}|\\*)",
          contains: [{ begin: "\\\\*\\w", relevance: 0 }],
        },
        {
          className: "emphasis",
          begin: "\\B'(?!['\\s])",
          end: "(\\n{2}|')",
          contains: [{ begin: "\\\\'\\w", relevance: 0 }],
          relevance: 0,
        },
        {
          className: "emphasis",
          begin: "_(?![_\\s])",
          end: "(\\n{2}|_)",
          relevance: 0,
        },
        {
          className: "string",
          variants: [{ begin: "``.+?''" }, { begin: "`.+?'" }],
        },
        { className: "code", begin: "(`.+?`|\\+.+?\\+)", relevance: 0 },
        { className: "code", begin: "^[ \\t]", end: "$", relevance: 0 },
        { begin: "^'{3,}[ \\t]*$", relevance: 10 },
        {
          begin: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
          returnBegin: !0,
          contains: [
            { begin: "(link|image:?):", relevance: 0 },
            { className: "link", begin: "\\w", end: "[^\\[]+", relevance: 0 },
            {
              className: "string",
              begin: "\\[",
              end: "\\]",
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0,
            },
          ],
          relevance: 10,
        },
      ],
    };
  }
  function n(e) {
    var n = {
        className: "variable",
        variants: [{ begin: /\$[\w\d#@][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }],
      },
      a = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          n,
          {
            className: "variable",
            begin: /\$\(/,
            end: /\)/,
            contains: [e.BACKSLASH_ESCAPE],
          },
        ],
      };
    return {
      aliases: ["sh", "zsh"],
      lexemes: /\b-?[a-z\._]+\b/,
      keywords: {
        keyword: "if then else elif fi for while in do done case esac function",
        literal: "true false",
        built_in:
          "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
        _: "-ne -eq -lt -gt -f -d -e -s -l -a",
      },
      contains: [
        { className: "meta", begin: /^#![^\n]+sh\s*$/, relevance: 10 },
        {
          className: "function",
          begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
          returnBegin: !0,
          contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
          relevance: 0,
        },
        e.HASH_COMMENT_MODE,
        a,
        { className: "", begin: /\\"/ },
        { className: "string", begin: /'/, end: /'/ },
        n,
      ],
    };
  }
  function a(e) {
    var n = {
        begin: (u =
          "[" + (u = "a-zA-Z_\\-!.?+*=<>&#'") + "][" + u + "0-9/;:]*"),
        relevance: 0,
      },
      a = { className: "number", begin: "[-+]?\\d+(\\.\\d+)?", relevance: 0 },
      t = e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
      i = e.COMMENT(";", "$", { relevance: 0 }),
      s = { className: "literal", begin: /\b(true|false|nil)\b/ },
      r = { begin: "[\\[\\{]", end: "[\\]\\}]" },
      l = { className: "comment", begin: "\\^" + u },
      o = e.COMMENT("\\^\\{", "\\}"),
      c = { className: "symbol", begin: "[:]{1,2}" + u },
      d = { begin: "\\(", end: "\\)" },
      g = { endsWithParent: !0, relevance: 0 },
      u = {
        keywords: {
          "builtin-name":
            "def defonce cond apply if-not if-let if not not= = < > <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize",
        },
        lexemes: u,
        className: "name",
        begin: u,
        starts: g,
      },
      n = [d, t, l, o, i, c, r, a, s, n];
    return (
      (d.contains = [e.COMMENT("comment", ""), u, g]),
      (g.contains = n),
      (r.contains = n),
      (o.contains = [r]),
      { aliases: ["clj"], illegal: /\S/, contains: [d, t, l, o, i, c, r, a, s] }
    );
  }
  function t(e) {
    function n(e) {
      return "(?:" + e + ")?";
    }
    var a = "decltype\\(auto\\)",
      t = "[a-zA-Z_]\\w*::",
      i = { className: "keyword", begin: "\\b[a-z\\d_]*_t\\b" },
      s = {
        className: "string",
        variants: [
          {
            begin: '(u8?|U|L)?"',
            end: '"',
            illegal: "\\n",
            contains: [e.BACKSLASH_ESCAPE],
          },
          {
            begin:
              "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
            end: "'",
            illegal: ".",
          },
          { begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\((?:.|\n)*?\)\1"/ },
        ],
      },
      r = {
        className: "number",
        variants: [
          { begin: "\\b(0b[01']+)" },
          {
            begin:
              "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)",
          },
          {
            begin:
              "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)",
          },
        ],
        relevance: 0,
      },
      l = {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          "meta-keyword":
            "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include",
        },
        contains: [
          { begin: /\\\n/, relevance: 0 },
          e.inherit(s, { className: "meta-string" }),
          {
            className: "meta-string",
            begin: /<.*?>/,
            end: /$/,
            illegal: "\\n",
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
        ],
      },
      o = { className: "title", begin: n(t) + e.IDENT_RE, relevance: 0 },
      t = n(t) + e.IDENT_RE + "\\s*\\(",
      c = {
        keyword:
          "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_tshort reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
        built_in:
          "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
        literal: "true false nullptr NULL",
      },
      d = [i, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, s],
      g = {
        variants: [
          { begin: /=/, end: /;/ },
          { begin: /\(/, end: /\)/ },
          { beginKeywords: "new throw return else", end: /;/ },
        ],
        keywords: c,
        contains: d.concat([
          {
            begin: /\(/,
            end: /\)/,
            keywords: c,
            contains: d.concat(["self"]),
            relevance: 0,
          },
        ]),
        relevance: 0,
      },
      a = {
        className: "function",
        begin:
          "((decltype\\(auto\\)|(?:[a-zA-Z_]\\w*::)?[a-zA-Z_]\\w*(?:<.*?>)?)[\\*&\\s]+)+" +
          t,
        returnBegin: !0,
        end: /[{;=]/,
        excludeEnd: !0,
        keywords: c,
        illegal: /[^\w\s\*&:<>]/,
        contains: [
          { begin: a, keywords: c, relevance: 0 },
          { begin: t, returnBegin: !0, contains: [o], relevance: 0 },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: c,
            relevance: 0,
            contains: [
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE,
              s,
              r,
              i,
              {
                begin: /\(/,
                end: /\)/,
                keywords: c,
                relevance: 0,
                contains: [
                  "self",
                  e.C_LINE_COMMENT_MODE,
                  e.C_BLOCK_COMMENT_MODE,
                  s,
                  r,
                  i,
                ],
              },
            ],
          },
          i,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          l,
        ],
      };
    return {
      aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
      keywords: c,
      illegal: "</",
      contains: [].concat(g, a, d, [
        l,
        {
          begin:
            "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
          end: ">",
          keywords: c,
          contains: ["self", i],
        },
        { begin: e.IDENT_RE + "::", keywords: c },
        {
          className: "class",
          beginKeywords: "class struct",
          end: /[{;:]/,
          contains: [
            { begin: /</, end: />/, contains: ["self"] },
            e.TITLE_MODE,
          ],
        },
      ]),
      exports: { preprocessor: l, strings: s, keywords: c },
    };
  }
  function i(e) {
    var n = {
        keyword:
          "abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let nameof on orderby partial remove select set value var when where yield",
        literal: "null false true",
      },
      a = {
        className: "number",
        variants: [
          { begin: "\\b(0b[01']+)" },
          {
            begin:
              "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)",
          },
          {
            begin:
              "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)",
          },
        ],
        relevance: 0,
      },
      t = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{ begin: '""' }],
      },
      i = e.inherit(t, { illegal: /\n/ }),
      s = { className: "subst", begin: "{", end: "}", keywords: n },
      r = e.inherit(s, { illegal: /\n/ }),
      l = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [{ begin: "{{" }, { begin: "}}" }, e.BACKSLASH_ESCAPE, r],
      },
      o = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [{ begin: "{{" }, { begin: "}}" }, { begin: '""' }, s],
      },
      c = e.inherit(o, {
        illegal: /\n/,
        contains: [{ begin: "{{" }, { begin: "}}" }, { begin: '""' }, r],
      }),
      s =
        ((s.contains = [
          o,
          l,
          t,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          a,
          e.C_BLOCK_COMMENT_MODE,
        ]),
        (r.contains = [
          c,
          l,
          i,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          a,
          e.inherit(e.C_BLOCK_COMMENT_MODE, { illegal: /\n/ }),
        ]),
        { variants: [o, l, t, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }),
      r =
        e.IDENT_RE +
        "(<" +
        e.IDENT_RE +
        "(\\s*,\\s*" +
        e.IDENT_RE +
        ")*>)?(\\[\\])?";
    return {
      aliases: ["csharp", "c#"],
      keywords: n,
      illegal: /::/,
      contains: [
        e.COMMENT("///", "$", {
          returnBegin: !0,
          contains: [
            {
              className: "doctag",
              variants: [
                { begin: "///", relevance: 0 },
                { begin: "\x3c!--|--\x3e" },
                { begin: "</?", end: ">" },
              ],
            },
          ],
        }),
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        {
          className: "meta",
          begin: "#",
          end: "$",
          keywords: {
            "meta-keyword":
              "if else elif endif define undef warning error line region endregion pragma checksum",
          },
        },
        s,
        a,
        {
          beginKeywords: "class interface",
          end: /[{;=]/,
          illegal: /[^\s:,]/,
          contains: [
            e.TITLE_MODE,
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
          ],
        },
        {
          beginKeywords: "namespace",
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [
            e.inherit(e.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" }),
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
          ],
        },
        {
          className: "meta",
          begin: "^\\s*\\[",
          excludeBegin: !0,
          end: "\\]",
          excludeEnd: !0,
          contains: [{ className: "meta-string", begin: /"/, end: /"/ }],
        },
        { beginKeywords: "new return throw await else", relevance: 0 },
        {
          className: "function",
          begin: "(" + r + "\\s+)+" + e.IDENT_RE + "\\s*\\(",
          returnBegin: !0,
          end: /\s*[{;=]/,
          excludeEnd: !0,
          keywords: n,
          contains: [
            {
              begin: e.IDENT_RE + "\\s*\\(",
              returnBegin: !0,
              contains: [e.TITLE_MODE],
              relevance: 0,
            },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: n,
              relevance: 0,
              contains: [s, a, e.C_BLOCK_COMMENT_MODE],
            },
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
          ],
        },
      ],
    };
  }
  function s(e) {
    var n = {
      className: "attribute",
      begin: /\S/,
      end: ":",
      excludeEnd: !0,
      starts: {
        endsWithParent: !0,
        excludeEnd: !0,
        contains: [
          {
            begin: /[\w-]+\(/,
            returnBegin: !0,
            contains: [
              { className: "built_in", begin: /[\w-]+/ },
              {
                begin: /\(/,
                end: /\)/,
                contains: [
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  e.CSS_NUMBER_MODE,
                ],
              },
            ],
          },
          e.CSS_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          e.C_BLOCK_COMMENT_MODE,
          { className: "number", begin: "#[0-9A-Fa-f]+" },
          { className: "meta", begin: "!important" },
        ],
      },
    };
    return {
      case_insensitive: !0,
      illegal: /[=\/|'\$]/,
      contains: [
        e.C_BLOCK_COMMENT_MODE,
        { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
        { className: "selector-class", begin: /\.[A-Za-z0-9_-]+/ },
        {
          className: "selector-attr",
          begin: /\[/,
          end: /\]/,
          illegal: "$",
          contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE],
        },
        {
          className: "selector-pseudo",
          begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/,
        },
        {
          begin: "@(page|font-face)",
          lexemes: "@[a-z-]+",
          keywords: "@page @font-face",
        },
        {
          begin: "@",
          end: "[{;]",
          illegal: /:/,
          returnBegin: !0,
          contains: [
            { className: "keyword", begin: /@\-?\w[\w]*(\-\w+)*/ },
            {
              begin: /\s/,
              endsWithParent: !0,
              excludeEnd: !0,
              relevance: 0,
              keywords: "and or not only",
              contains: [
                { begin: /[a-z-]+:/, className: "attribute" },
                e.APOS_STRING_MODE,
                e.QUOTE_STRING_MODE,
                e.CSS_NUMBER_MODE,
              ],
            },
          ],
        },
        {
          className: "selector-tag",
          begin: "[a-zA-Z-][a-zA-Z0-9_-]*",
          relevance: 0,
        },
        {
          begin: "{",
          end: "}",
          illegal: /\S/,
          contains: [
            e.C_BLOCK_COMMENT_MODE,
            {
              begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
              returnBegin: !0,
              end: ";",
              endsWithParent: !0,
              contains: [n],
            },
          ],
        },
      ],
    };
  }
  function r(e) {
    return {
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          variants: [
            { begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ },
            { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
            { begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ },
          ],
        },
        {
          className: "comment",
          variants: [
            { begin: /Index: /, end: /$/ },
            { begin: /={3,}/, end: /$/ },
            { begin: /^\-{3}/, end: /$/ },
            { begin: /^\*{3} /, end: /$/ },
            { begin: /^\+{3}/, end: /$/ },
            { begin: /^\*{15}$/ },
          ],
        },
        { className: "addition", begin: "^\\+", end: "$" },
        { className: "deletion", begin: "^\\-", end: "$" },
        { className: "addition", begin: "^\\!", end: "$" },
      ],
    };
  }
  function l(e) {
    return {
      aliases: ["docker"],
      case_insensitive: !0,
      keywords: "from maintainer expose env arg user onbuild stopsignal",
      contains: [
        e.HASH_COMMENT_MODE,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        e.NUMBER_MODE,
        {
          beginKeywords:
            "run cmd entrypoint volume add copy workdir label healthcheck shell",
          starts: { end: /[^\\]$/, subLanguage: "bash" },
        },
      ],
      illegal: "</",
    };
  }
  function o(e) {
    var n = "[a-zA-Z_][a-zA-Z0-9_.]*(\\!|\\?)?",
      a =
        "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0",
      t = {
        className: "subst",
        begin: "#\\{",
        end: "}",
        lexemes: n,
        keywords: a,
      },
      i = {
        className: "string",
        begin: "~[a-z](?=" + (s = "[/|([{<\"']") + ")",
        contains: [
          {
            endsParent: !0,
            contains: [
              {
                contains: [e.BACKSLASH_ESCAPE, t],
                variants: [
                  { begin: /"/, end: /"/ },
                  { begin: /'/, end: /'/ },
                  { begin: /\//, end: /\// },
                  { begin: /\|/, end: /\|/ },
                  { begin: /\(/, end: /\)/ },
                  { begin: /\[/, end: /\]/ },
                  { begin: /\{/, end: /\}/ },
                  { begin: /</, end: />/ },
                ],
              },
            ],
          },
        ],
      },
      s = {
        className: "string",
        begin: "~[A-Z](?=" + s + ")",
        contains: [
          { begin: /"/, end: /"/ },
          { begin: /'/, end: /'/ },
          { begin: /\//, end: /\// },
          { begin: /\|/, end: /\|/ },
          { begin: /\(/, end: /\)/ },
          { begin: /\[/, end: /\]/ },
          { begin: /\{/, end: /\}/ },
          { begin: /\</, end: /\>/ },
        ],
      },
      r = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          { begin: /"""/, end: /"""/ },
          { begin: /'''/, end: /'''/ },
          { begin: /~S"""/, end: /"""/, contains: [] },
          { begin: /~S"/, end: /"/, contains: [] },
          { begin: /~S'''/, end: /'''/, contains: [] },
          { begin: /~S'/, end: /'/, contains: [] },
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
        ],
      },
      l = {
        className: "function",
        beginKeywords: "def defp defmacro",
        end: /\B\b/,
        contains: [e.inherit(e.TITLE_MODE, { begin: n, endsParent: !0 })],
      },
      o = e.inherit(l, {
        className: "class",
        beginKeywords: "defimpl defmodule defprotocol defrecord",
        end: /\bdo\b|$|;/,
      }),
      s = [
        r,
        s,
        i,
        e.HASH_COMMENT_MODE,
        o,
        l,
        { begin: "::" },
        {
          className: "symbol",
          begin: ":(?![\\s:])",
          contains: [
            r,
            {
              begin:
                "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
            },
          ],
          relevance: 0,
        },
        { className: "symbol", begin: n + ":(?!:)", relevance: 0 },
        {
          className: "number",
          begin:
            "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(.[0-9_]+([eE][-+]?[0-9]+)?)?)",
          relevance: 0,
        },
        { className: "variable", begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" },
        { begin: "->" },
        {
          begin: "(" + e.RE_STARTERS_RE + ")\\s*",
          contains: [
            e.HASH_COMMENT_MODE,
            {
              className: "regexp",
              illegal: "\\n",
              contains: [e.BACKSLASH_ESCAPE, t],
              variants: [
                { begin: "/", end: "/[a-z]*" },
                { begin: "%r\\[", end: "\\][a-z]*" },
              ],
            },
          ],
          relevance: 0,
        },
      ];
    return { lexemes: n, keywords: a, contains: (t.contains = s) };
  }
  function c(e) {
    var n = {
      keyword:
        "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
      literal: "true false iota nil",
      built_in:
        "append cap close complex copy imag len make new panic print println real recover delete",
    };
    return {
      aliases: ["golang"],
      keywords: n,
      illegal: "</",
      contains: [
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        {
          className: "string",
          variants: [
            e.QUOTE_STRING_MODE,
            e.APOS_STRING_MODE,
            { begin: "`", end: "`" },
          ],
        },
        {
          className: "number",
          variants: [
            { begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
            e.C_NUMBER_MODE,
          ],
        },
        { begin: /:=/ },
        {
          className: "function",
          beginKeywords: "func",
          end: "\\s*(\\{|$)",
          excludeEnd: !0,
          contains: [
            e.TITLE_MODE,
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: n,
              illegal: /["']/,
            },
          ],
        },
      ],
    };
  }
  function d(e) {
    return {
      keywords: {
        literal: "true false null",
        keyword:
          "byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof",
      },
      contains: [
        e.COMMENT("/\\*\\*", "\\*/", {
          relevance: 0,
          contains: [
            { begin: /\w+@/, relevance: 0 },
            { className: "doctag", begin: "@[A-Za-z]+" },
          ],
        }),
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        { className: "string", begin: '"""', end: '"""' },
        { className: "string", begin: "'''", end: "'''" },
        { className: "string", begin: "\\$/", end: "/\\$", relevance: 10 },
        e.APOS_STRING_MODE,
        {
          className: "regexp",
          begin: /~?\/[^\/\n]+\//,
          contains: [e.BACKSLASH_ESCAPE],
        },
        e.QUOTE_STRING_MODE,
        {
          className: "meta",
          begin: "^#!/usr/bin/env",
          end: "$",
          illegal: "\n",
        },
        e.BINARY_NUMBER_MODE,
        {
          className: "class",
          beginKeywords: "class interface trait enum",
          end: "{",
          illegal: ":",
          contains: [
            { beginKeywords: "extends implements" },
            e.UNDERSCORE_TITLE_MODE,
          ],
        },
        e.C_NUMBER_MODE,
        { className: "meta", begin: "@[A-Za-z]+" },
        { className: "string", begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/ },
        { begin: /\?/, end: /\:/ },
        { className: "symbol", begin: "^\\s*[A-Za-z0-9_$]+:", relevance: 0 },
      ],
      illegal: /#|<\//,
    };
  }
  function g(e) {
    var n = {
        variants: [
          e.COMMENT("--", "$"),
          e.COMMENT("{-", "-}", { contains: ["self"] }),
        ],
      },
      a = { className: "meta", begin: "{-#", end: "#-}" },
      t = { className: "meta", begin: "^#", end: "$" },
      i = { className: "type", begin: "\\b[A-Z][\\w']*", relevance: 0 },
      s = {
        begin: "\\(",
        end: "\\)",
        illegal: '"',
        contains: [
          a,
          t,
          {
            className: "type",
            begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?",
          },
          e.inherit(e.TITLE_MODE, { begin: "[_a-z][\\w']*" }),
          n,
        ],
      };
    return {
      aliases: ["hs"],
      keywords:
        "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
      contains: [
        {
          beginKeywords: "module",
          end: "where",
          keywords: "module where",
          contains: [s, n],
          illegal: "\\W\\.|;",
        },
        {
          begin: "\\bimport\\b",
          end: "$",
          keywords: "import qualified as hiding",
          contains: [s, n],
          illegal: "\\W\\.|;",
        },
        {
          className: "class",
          begin: "^(\\s*)?(class|instance)\\b",
          end: "where",
          keywords: "class family instance where",
          contains: [i, s, n],
        },
        {
          className: "class",
          begin: "\\b(data|(new)?type)\\b",
          end: "$",
          keywords: "data family type newtype deriving",
          contains: [
            a,
            i,
            s,
            { begin: "{", end: "}", contains: s.contains },
            n,
          ],
        },
        { beginKeywords: "default", end: "$", contains: [i, s, n] },
        {
          beginKeywords: "infix infixl infixr",
          end: "$",
          contains: [e.C_NUMBER_MODE, n],
        },
        {
          begin: "\\bforeign\\b",
          end: "$",
          keywords:
            "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
          contains: [i, e.QUOTE_STRING_MODE, n],
        },
        {
          className: "meta",
          begin: "#!\\/usr\\/bin\\/env runhaskell",
          end: "$",
        },
        a,
        t,
        e.QUOTE_STRING_MODE,
        e.C_NUMBER_MODE,
        i,
        e.inherit(e.TITLE_MODE, { begin: "^[_a-z][\\w']*" }),
        n,
        { begin: "->|<-" },
      ],
    };
  }
  function u(e) {
    var n =
        "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
      a = {
        className: "number",
        begin:
          "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        relevance: 0,
      };
    return {
      aliases: ["jsp"],
      keywords: n,
      illegal: /<\/|#/,
      contains: [
        e.COMMENT("/\\*\\*", "\\*/", {
          relevance: 0,
          contains: [
            { begin: /\w+@/, relevance: 0 },
            { className: "doctag", begin: "@[A-Za-z]+" },
          ],
        }),
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        {
          className: "class",
          beginKeywords: "class interface",
          end: /[{;=]/,
          excludeEnd: !0,
          keywords: "class interface",
          illegal: /[:"\[\]]/,
          contains: [
            { beginKeywords: "extends implements" },
            e.UNDERSCORE_TITLE_MODE,
          ],
        },
        { beginKeywords: "new throw return else", relevance: 0 },
        {
          className: "function",
          begin:
            "([À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(<[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(\\s*,\\s*[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*)*>)?\\s+)+" +
            e.UNDERSCORE_IDENT_RE +
            "\\s*\\(",
          returnBegin: !0,
          end: /[{;=]/,
          excludeEnd: !0,
          keywords: n,
          contains: [
            {
              begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
              returnBegin: !0,
              relevance: 0,
              contains: [e.UNDERSCORE_TITLE_MODE],
            },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: n,
              relevance: 0,
              contains: [
                e.APOS_STRING_MODE,
                e.QUOTE_STRING_MODE,
                e.C_NUMBER_MODE,
                e.C_BLOCK_COMMENT_MODE,
              ],
            },
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
          ],
        },
        a,
        { className: "meta", begin: "@[A-Za-z]+" },
      ],
    };
  }
  function _(e) {
    var n = "<>",
      a = "</>",
      t = /<[A-Za-z0-9\\._:-]+/,
      i = /\/[A-Za-z0-9\\._:-]+>|\/>/,
      s = "[A-Za-z$_][0-9A-Za-z$_]*",
      r = {
        keyword:
          "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
        literal: "true false null undefined NaN Infinity",
        built_in:
          "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise",
      },
      l = {
        className: "number",
        variants: [
          { begin: "\\b(0[bB][01]+)n?" },
          { begin: "\\b(0[oO][0-7]+)n?" },
          { begin: e.C_NUMBER_RE + "n?" },
        ],
        relevance: 0,
      },
      o = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: r,
        contains: [],
      },
      c = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, o],
          subLanguage: "xml",
        },
      },
      d = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [e.BACKSLASH_ESCAPE, o],
          subLanguage: "css",
        },
      },
      g = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [e.BACKSLASH_ESCAPE, o],
      },
      o =
        ((o.contains = [
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          c,
          d,
          g,
          l,
          e.REGEXP_MODE,
        ]),
        o.contains.concat([e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE]));
    return {
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: r,
      contains: [
        {
          className: "meta",
          relevance: 10,
          begin: /^\s*['"]use (strict|asm)['"]/,
        },
        { className: "meta", begin: /^#!/, end: /$/ },
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        c,
        d,
        g,
        e.C_LINE_COMMENT_MODE,
        e.COMMENT("/\\*\\*", "\\*/", {
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+",
              contains: [
                { className: "type", begin: "\\{", end: "\\}", relevance: 0 },
                {
                  className: "variable",
                  begin: s + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0,
                },
                { begin: /(?=[^\n])\s/, relevance: 0 },
              ],
            },
          ],
        }),
        e.C_BLOCK_COMMENT_MODE,
        l,
        {
          begin: /[{,\n]\s*/,
          relevance: 0,
          contains: [
            {
              begin: s + "\\s*:",
              returnBegin: !0,
              relevance: 0,
              contains: [{ className: "attr", begin: s, relevance: 0 }],
            },
          ],
        },
        {
          begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          contains: [
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
            e.REGEXP_MODE,
            {
              className: "function",
              begin: "(\\(.*?\\)|" + s + ")\\s*=>",
              returnBegin: !0,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    { begin: s },
                    { begin: /\(\s*\)/ },
                    {
                      begin: /\(/,
                      end: /\)/,
                      excludeBegin: !0,
                      excludeEnd: !0,
                      keywords: r,
                      contains: o,
                    },
                  ],
                },
              ],
            },
            { className: "", begin: /\s/, end: /\s*/, skip: !0 },
            {
              variants: [
                { begin: n, end: a },
                { begin: t, end: i },
              ],
              subLanguage: "xml",
              contains: [{ begin: t, end: i, skip: !0, contains: ["self"] }],
            },
          ],
          relevance: 0,
        },
        {
          className: "function",
          beginKeywords: "function",
          end: /\{/,
          excludeEnd: !0,
          contains: [
            e.inherit(e.TITLE_MODE, { begin: s }),
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              contains: o,
            },
          ],
          illegal: /\[|%/,
        },
        { begin: /\$[(.]/ },
        e.METHOD_GUARD,
        {
          className: "class",
          beginKeywords: "class",
          end: /[{;=]/,
          excludeEnd: !0,
          illegal: /[:"\[\]]/,
          contains: [{ beginKeywords: "extends" }, e.UNDERSCORE_TITLE_MODE],
        },
        { beginKeywords: "constructor get set", end: /\{/, excludeEnd: !0 },
      ],
      illegal: /#(?!!)/,
    };
  }
  function m(e) {
    var n = { literal: "true false null" },
      a = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
      t = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
      i = {
        end: ",",
        endsWithParent: !0,
        excludeEnd: !0,
        contains: t,
        keywords: n,
      },
      s = {
        begin: "{",
        end: "}",
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE],
            illegal: "\\n",
          },
          e.inherit(i, { begin: /:/ }),
        ].concat(a),
        illegal: "\\S",
      },
      e = {
        begin: "\\[",
        end: "\\]",
        contains: [e.inherit(i)],
        illegal: "\\S",
      };
    return (
      t.push(s, e),
      a.forEach(function (e) {
        t.push(e);
      }),
      { contains: t, keywords: n, illegal: "\\S" }
    );
  }
  function b(e) {
    var n = {
        keyword:
          "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual trait volatile transient native default",
        built_in:
          "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null",
      },
      a = { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@" },
      t = {
        className: "subst",
        begin: "\\${",
        end: "}",
        contains: [e.C_NUMBER_MODE],
      },
      i = {
        className: "string",
        variants: [
          {
            begin: '"""',
            end: '"""(?=[^"])',
            contains: [
              (i = {
                className: "variable",
                begin: "\\$" + e.UNDERSCORE_IDENT_RE,
              }),
              t,
            ],
          },
          {
            begin: "'",
            end: "'",
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE],
          },
          {
            begin: '"',
            end: '"',
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE, i, t],
          },
        ],
      },
      t =
        (t.contains.push(i),
        {
          className: "meta",
          begin:
            "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" +
            e.UNDERSCORE_IDENT_RE +
            ")?",
        }),
      s = {
        className: "meta",
        begin: "@" + e.UNDERSCORE_IDENT_RE,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            contains: [e.inherit(i, { className: "meta-string" })],
          },
        ],
      },
      r = {
        className: "number",
        begin:
          "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        relevance: 0,
      },
      l = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }),
      o = {
        variants: [
          { className: "type", begin: e.UNDERSCORE_IDENT_RE },
          { begin: /\(/, end: /\)/, contains: [] },
        ],
      },
      c = o;
    return (
      (c.variants[1].contains = [o]),
      (o.variants[1].contains = [c]),
      {
        aliases: ["kt"],
        keywords: n,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }],
          }),
          e.C_LINE_COMMENT_MODE,
          l,
          {
            className: "keyword",
            begin: /\b(break|continue|return|this)\b/,
            starts: { contains: [{ className: "symbol", begin: /@\w+/ }] },
          },
          a,
          t,
          s,
          {
            className: "function",
            beginKeywords: "fun",
            end: "[(]|$",
            returnBegin: !0,
            excludeEnd: !0,
            keywords: n,
            illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            relevance: 5,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE],
              },
              {
                className: "type",
                begin: /</,
                end: />/,
                keywords: "reified",
                relevance: 0,
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: !0,
                keywords: n,
                relevance: 0,
                contains: [
                  {
                    begin: /:/,
                    end: /[=,\/]/,
                    endsWithParent: !0,
                    contains: [o, e.C_LINE_COMMENT_MODE, l],
                    relevance: 0,
                  },
                  e.C_LINE_COMMENT_MODE,
                  l,
                  t,
                  s,
                  i,
                  e.C_NUMBER_MODE,
                ],
              },
              l,
            ],
          },
          {
            className: "class",
            beginKeywords: "class interface trait",
            end: /[:\{(]|$/,
            excludeEnd: !0,
            illegal: "extends implements",
            contains: [
              {
                beginKeywords: "public protected internal private constructor",
              },
              e.UNDERSCORE_TITLE_MODE,
              {
                className: "type",
                begin: /</,
                end: />/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
              },
              {
                className: "type",
                begin: /[,:]\s*/,
                end: /[<\(,]|$/,
                excludeBegin: !0,
                returnEnd: !0,
              },
              t,
              s,
            ],
          },
          i,
          {
            className: "meta",
            begin: "^#!/usr/bin/env",
            end: "$",
            illegal: "\n",
          },
          r,
        ],
      }
    );
  }
  function p(e) {
    var n = "\\[=*\\[",
      a = "\\]=*\\]",
      t = { begin: n, end: a, contains: ["self"] },
      i = [
        e.COMMENT("--(?!" + n + ")", "$"),
        e.COMMENT("--" + n, a, { contains: [t], relevance: 10 }),
      ];
    return {
      lexemes: e.UNDERSCORE_IDENT_RE,
      keywords: {
        literal: "true false nil",
        keyword:
          "and break do else elseif end for goto if in local not or repeat return then until while",
        built_in:
          "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstringmodule next pairs pcall print rawequal rawget rawset require select setfenvsetmetatable tonumber tostring type unpack xpcall arg selfcoroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove",
      },
      contains: i.concat([
        {
          className: "function",
          beginKeywords: "function",
          end: "\\)",
          contains: [
            e.inherit(e.TITLE_MODE, {
              begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*",
            }),
            {
              className: "params",
              begin: "\\(",
              endsWithParent: !0,
              contains: i,
            },
          ].concat(i),
        },
        e.C_NUMBER_MODE,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        { className: "string", begin: n, end: a, contains: [t], relevance: 5 },
      ]),
    };
  }
  function f(e) {
    return {
      aliases: ["md", "mkdown", "mkd"],
      contains: [
        {
          className: "section",
          variants: [
            { begin: "^#{1,6}", end: "$" },
            { begin: "^.+?\\n[=-]{2,}$" },
          ],
        },
        { begin: "<", end: ">", subLanguage: "xml", relevance: 0 },
        { className: "bullet", begin: "^\\s*([*+-]|(\\d+\\.))\\s+" },
        { className: "strong", begin: "[*_]{2}.+?[*_]{2}" },
        {
          className: "emphasis",
          variants: [{ begin: "\\*.+?\\*" }, { begin: "_.+?_", relevance: 0 }],
        },
        { className: "quote", begin: "^>\\s+", end: "$" },
        {
          className: "code",
          variants: [
            { begin: "^```\\w*\\s*$", end: "^```[ ]*$" },
            { begin: "`.+?`" },
            { begin: "^( {4}|\\t)", end: "$", relevance: 0 },
          ],
        },
        { begin: "^[-\\*]{3,}", end: "$" },
        {
          begin: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
          returnBegin: !0,
          contains: [
            {
              className: "string",
              begin: "\\[",
              end: "\\]",
              excludeBegin: !0,
              returnEnd: !0,
              relevance: 0,
            },
            {
              className: "link",
              begin: "\\]\\(",
              end: "\\)",
              excludeBegin: !0,
              excludeEnd: !0,
            },
            {
              className: "symbol",
              begin: "\\]\\[",
              end: "\\]",
              excludeBegin: !0,
              excludeEnd: !0,
            },
          ],
          relevance: 10,
        },
        {
          begin: /^\[[^\n]+\]:/,
          returnBegin: !0,
          contains: [
            {
              className: "symbol",
              begin: /\[/,
              end: /\]/,
              excludeBegin: !0,
              excludeEnd: !0,
            },
            { className: "link", begin: /:\s*/, end: /$/, excludeBegin: !0 },
          ],
        },
      ],
    };
  }
  function E(e) {
    var n = {
        keyword: "rec with let in inherit assert if else then",
        literal: "true false or and null",
        built_in:
          "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation",
      },
      a = { className: "subst", begin: /\$\{/, end: /}/, keywords: n },
      e = [
        e.NUMBER_MODE,
        e.HASH_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        {
          className: "string",
          contains: [a],
          variants: [
            { begin: "''", end: "''" },
            { begin: '"', end: '"' },
          ],
        },
        {
          begin: /[a-zA-Z0-9-_]+(\s*=)/,
          returnBegin: !0,
          relevance: 0,
          contains: [{ className: "attr", begin: /\S+/ }],
        },
      ];
    return { aliases: ["nixos"], keywords: n, contains: (a.contains = e) };
  }
  function N(e) {
    return { disableAutodetect: !0 };
  }
  function h(e) {
    var n = /[a-zA-Z@][a-zA-Z0-9_]*/,
      a = "@interface @class @protocol @implementation";
    return {
      aliases: ["mm", "objc", "obj-c"],
      keywords: {
        keyword:
          "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in:
          "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once",
      },
      lexemes: n,
      illegal: "</",
      contains: [
        {
          className: "built_in",
          begin:
            "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+",
        },
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        e.C_NUMBER_MODE,
        e.QUOTE_STRING_MODE,
        e.APOS_STRING_MODE,
        {
          className: "string",
          variants: [
            {
              begin: '@"',
              end: '"',
              illegal: "\\n",
              contains: [e.BACKSLASH_ESCAPE],
            },
          ],
        },
        {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword":
              "if else elif endif define undef warning error line pragma ifdef ifndef include",
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e.inherit(e.QUOTE_STRING_MODE, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n",
            },
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
          ],
        },
        {
          className: "class",
          begin: "(" + a.split(" ").join("|") + ")\\b",
          end: "({|$)",
          excludeEnd: !0,
          keywords: a,
          lexemes: n,
          contains: [e.UNDERSCORE_TITLE_MODE],
        },
        { begin: "\\." + e.UNDERSCORE_IDENT_RE, relevance: 0 },
      ],
    };
  }
  function v(e) {
    var n =
        "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
      a = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: n },
      t = { begin: "->{", end: "}" },
      i = {
        variants: [
          { begin: /\$\d/ },
          { begin: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/ },
          { begin: /[\$%@][^\s\w{]/, relevance: 0 },
        ],
      },
      s = [e.BACKSLASH_ESCAPE, a, i],
      i = [
        i,
        e.HASH_COMMENT_MODE,
        e.COMMENT("^\\=\\w", "\\=cut", { endsWithParent: !0 }),
        t,
        {
          className: "string",
          contains: s,
          variants: [
            { begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\<", end: "\\>", relevance: 5 },
            { begin: "qw\\s+q", end: "q", relevance: 5 },
            { begin: "'", end: "'", contains: [e.BACKSLASH_ESCAPE] },
            { begin: '"', end: '"' },
            { begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE] },
            { begin: "{\\w+}", contains: [], relevance: 0 },
            { begin: "-?\\w+\\s*\\=\\>", contains: [], relevance: 0 },
          ],
        },
        {
          className: "number",
          begin:
            "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0,
        },
        {
          begin:
            "(\\/\\/|" +
            e.RE_STARTERS_RE +
            "|\\b(split|return|print|reverse|grep)\\b)\\s*",
          keywords: "split return print reverse grep",
          relevance: 0,
          contains: [
            e.HASH_COMMENT_MODE,
            {
              className: "regexp",
              begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
              relevance: 10,
            },
            {
              className: "regexp",
              begin: "(m|qr)?/",
              end: "/[a-z]*",
              contains: [e.BACKSLASH_ESCAPE],
              relevance: 0,
            },
          ],
        },
        {
          className: "function",
          beginKeywords: "sub",
          end: "(\\s*\\(.*?\\))?[;{]",
          excludeEnd: !0,
          relevance: 5,
          contains: [e.TITLE_MODE],
        },
        { begin: "-\\w\\b", relevance: 0 },
        {
          begin: "^__DATA__$",
          end: "^__END__$",
          subLanguage: "mojolicious",
          contains: [{ begin: "^@@.*", end: "$", className: "comment" }],
        },
      ];
    return (
      (a.contains = i),
      {
        aliases: ["pl", "pm"],
        lexemes: /[\w\.]+/,
        keywords: n,
        contains: (t.contains = i),
      }
    );
  }
  function y(e) {
    var n = { begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*" },
      a = { className: "meta", begin: /<\?(php)?|\?>/ },
      t = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, a],
        variants: [
          { begin: 'b"', end: '"' },
          { begin: "b'", end: "'" },
          e.inherit(e.APOS_STRING_MODE, { illegal: null }),
          e.inherit(e.QUOTE_STRING_MODE, { illegal: null }),
        ],
      },
      i = { variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE] };
    return {
      aliases: ["php", "php3", "php4", "php5", "php6", "php7"],
      case_insensitive: !0,
      keywords:
        "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
      contains: [
        e.HASH_COMMENT_MODE,
        e.COMMENT("//", "$", { contains: [a] }),
        e.COMMENT("/\\*", "\\*/", {
          contains: [{ className: "doctag", begin: "@[A-Za-z]+" }],
        }),
        e.COMMENT("__halt_compiler.+?;", !1, {
          endsWithParent: !0,
          keywords: "__halt_compiler",
          lexemes: e.UNDERSCORE_IDENT_RE,
        }),
        {
          className: "string",
          begin: /<<<['"]?\w+['"]?$/,
          end: /^\w+;?$/,
          contains: [
            e.BACKSLASH_ESCAPE,
            {
              className: "subst",
              variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }],
            },
          ],
        },
        a,
        { className: "keyword", begin: /\$this\b/ },
        n,
        { begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ },
        {
          className: "function",
          beginKeywords: "function",
          end: /[;{]/,
          excludeEnd: !0,
          illegal: "\\$|\\[|%",
          contains: [
            e.UNDERSCORE_TITLE_MODE,
            {
              className: "params",
              begin: "\\(",
              end: "\\)",
              contains: ["self", n, e.C_BLOCK_COMMENT_MODE, t, i],
            },
          ],
        },
        {
          className: "class",
          beginKeywords: "class interface",
          end: "{",
          excludeEnd: !0,
          illegal: /[:\(\$"]/,
          contains: [
            { beginKeywords: "extends implements" },
            e.UNDERSCORE_TITLE_MODE,
          ],
        },
        {
          beginKeywords: "namespace",
          end: ";",
          illegal: /[\.']/,
          contains: [e.UNDERSCORE_TITLE_MODE],
        },
        { beginKeywords: "use", end: ";", contains: [e.UNDERSCORE_TITLE_MODE] },
        { begin: "=>" },
        t,
        i,
      ],
    };
  }
  function w(e) {
    var n = "[ \\t\\f]*",
      a = "(" + n + "[:=]" + n + "|[ \\t\\f]+)",
      t = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",
      i = "([^\\\\:= \\t\\f\\n]|\\\\.)+",
      s = {
        end: a,
        relevance: 0,
        starts: {
          className: "string",
          end: /$/,
          relevance: 0,
          contains: [{ begin: "\\\\\\n" }],
        },
      };
    return {
      case_insensitive: !0,
      illegal: /\S/,
      contains: [
        e.COMMENT("^\\s*[!#]", "$"),
        {
          begin: t + a,
          returnBegin: !0,
          contains: [
            { className: "attr", begin: t, endsParent: !0, relevance: 0 },
          ],
          starts: s,
        },
        {
          begin: i + a,
          returnBegin: !0,
          relevance: 0,
          contains: [
            { className: "meta", begin: i, endsParent: !0, relevance: 0 },
          ],
          starts: s,
        },
        { className: "attr", relevance: 0, begin: i + n + "$" },
      ],
    };
  }
  function O(e) {
    var n = e.COMMENT("#", "$"),
      a = "([A-Za-z_]|::)(\\w|::)*",
      t = e.inherit(e.TITLE_MODE, { begin: a }),
      a = { className: "variable", begin: "\\$" + a },
      i = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, a],
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
        ],
      };
    return {
      aliases: ["pp"],
      contains: [
        n,
        a,
        i,
        {
          beginKeywords: "class",
          end: "\\{|;",
          illegal: /=/,
          contains: [t, n],
        },
        {
          beginKeywords: "define",
          end: /\{/,
          contains: [
            { className: "section", begin: e.IDENT_RE, endsParent: !0 },
          ],
        },
        {
          begin: e.IDENT_RE + "\\s+\\{",
          returnBegin: !0,
          end: /\S/,
          contains: [
            { className: "keyword", begin: e.IDENT_RE },
            {
              begin: /\{/,
              end: /\}/,
              keywords: {
                keyword:
                  "and case default else elsif false if in import enherits node or true undef unless main settings $string ",
                literal:
                  "alias audit before loglevel noop require subscribe tag owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check en_address ip_address realname command environment hour monute month monthday special target weekday creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey sslverify mounted",
                built_in:
                  "architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version",
              },
              relevance: 0,
              contains: [
                i,
                n,
                {
                  begin: "[a-zA-Z_]+\\s*=>",
                  returnBegin: !0,
                  end: "=>",
                  contains: [{ className: "attr", begin: e.IDENT_RE }],
                },
                {
                  className: "number",
                  begin:
                    "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                  relevance: 0,
                },
                a,
              ],
            },
          ],
          relevance: 0,
        },
      ],
    };
  }
  function M(e) {
    var n = {
        keyword:
          "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10",
        built_in: "Ellipsis NotImplemented",
        literal: "False None True",
      },
      a = { className: "meta", begin: /^(>>>|\.\.\.) / },
      t = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: n,
        illegal: /#/,
      },
      i = { begin: /\{\{/, relevance: 0 },
      i = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: /(u|b)?r?'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10,
          },
          {
            begin: /(u|b)?r?"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10,
          },
          {
            begin: /(fr|rf|f)'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a, i, t],
          },
          {
            begin: /(fr|rf|f)"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a, i, t],
          },
          { begin: /(u|r|ur)'/, end: /'/, relevance: 10 },
          { begin: /(u|r|ur)"/, end: /"/, relevance: 10 },
          { begin: /(b|br)'/, end: /'/ },
          { begin: /(b|br)"/, end: /"/ },
          {
            begin: /(fr|rf|f)'/,
            end: /'/,
            contains: [e.BACKSLASH_ESCAPE, i, t],
          },
          {
            begin: /(fr|rf|f)"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, i, t],
          },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
        ],
      },
      s = {
        className: "number",
        relevance: 0,
        variants: [
          { begin: e.BINARY_NUMBER_RE + "[lLjJ]?" },
          { begin: "\\b(0o[0-7]+)[lLjJ]?" },
          { begin: e.C_NUMBER_RE + "[lLjJ]?" },
        ],
      },
      r = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        contains: ["self", a, s, i, e.HASH_COMMENT_MODE],
      };
    return (
      (t.contains = [i, s, a]),
      {
        aliases: ["py", "gyp", "ipython"],
        keywords: n,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
          a,
          s,
          { beginKeywords: "if", relevance: 0 },
          i,
          e.HASH_COMMENT_MODE,
          {
            variants: [
              { className: "function", beginKeywords: "def" },
              { className: "class", beginKeywords: "class" },
            ],
            end: /:/,
            illegal: /[${=;\n,]/,
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              r,
              { begin: /->/, endsWithParent: !0, keywords: "None" },
            ],
          },
          { className: "meta", begin: /^[\t ]*@/, end: /$/ },
          { begin: /\b(print|exec)\(/ },
        ],
      }
    );
  }
  function x(e) {
    var n =
        "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
      a = {
        keyword:
          "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
        literal: "true false nil",
      },
      t = { className: "doctag", begin: "@[A-Za-z]+" },
      i = { begin: "#<", end: ">" },
      t = [
        e.COMMENT("#", "$", { contains: [t] }),
        e.COMMENT("^\\=begin", "^\\=end", { contains: [t], relevance: 10 }),
        e.COMMENT("^__END__", "\\n$"),
      ],
      s = { className: "subst", begin: "#\\{", end: "}", keywords: a },
      r = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, s],
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /`/, end: /`/ },
          { begin: "%[qQwWx]?\\(", end: "\\)" },
          { begin: "%[qQwWx]?\\[", end: "\\]" },
          { begin: "%[qQwWx]?{", end: "}" },
          { begin: "%[qQwWx]?<", end: ">" },
          { begin: "%[qQwWx]?/", end: "/" },
          { begin: "%[qQwWx]?%", end: "%" },
          { begin: "%[qQwWx]?-", end: "-" },
          { begin: "%[qQwWx]?\\|", end: "\\|" },
          {
            begin:
              /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/,
          },
          {
            begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
            returnBegin: !0,
            contains: [
              { begin: /<<[-~]?'?/ },
              {
                begin: /\w+/,
                endSameAsBegin: !0,
                contains: [e.BACKSLASH_ESCAPE, s],
              },
            ],
          },
        ],
      },
      l = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        endsParent: !0,
        keywords: a,
      },
      r = [
        r,
        i,
        {
          className: "class",
          beginKeywords: "class module",
          end: "$|;",
          illegal: /=/,
          contains: [
            e.inherit(e.TITLE_MODE, {
              begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",
            }),
            {
              begin: "<\\s*",
              contains: [{ begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE }],
            },
          ].concat(t),
        },
        {
          className: "function",
          beginKeywords: "def",
          end: "$|;",
          contains: [e.inherit(e.TITLE_MODE, { begin: n }), l].concat(t),
        },
        { begin: e.IDENT_RE + "::" },
        {
          className: "symbol",
          begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
          relevance: 0,
        },
        {
          className: "symbol",
          begin: ":(?!\\s)",
          contains: [r, { begin: n }],
          relevance: 0,
        },
        {
          className: "number",
          begin:
            "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0,
        },
        { begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" },
        { className: "params", begin: /\|/, end: /\|/, keywords: a },
        {
          begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
          keywords: "unless",
          contains: [
            i,
            {
              className: "regexp",
              contains: [e.BACKSLASH_ESCAPE, s],
              illegal: /\n/,
              variants: [
                { begin: "/", end: "/[a-z]*" },
                { begin: "%r{", end: "}[a-z]*" },
                { begin: "%r\\(", end: "\\)[a-z]*" },
                { begin: "%r!", end: "![a-z]*" },
                { begin: "%r\\[", end: "\\][a-z]*" },
              ],
            },
          ].concat(t),
          relevance: 0,
        },
      ].concat(t);
    return (
      (s.contains = r),
      {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        keywords: a,
        illegal: /\/\*/,
        contains: t
          .concat([
            {
              begin: /^\s*=>/,
              starts: { end: "$", contains: (l.contains = r) },
            },
            {
              className: "meta",
              begin:
                "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",
              starts: { end: "$", contains: r },
            },
          ])
          .concat(r),
      }
    );
  }
  function C(e) {
    var n = "([ui](8|16|32|64|128|size)|f(32|64))?",
      a =
        "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
    return {
      aliases: ["rs"],
      keywords: {
        keyword:
          "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
        literal: "true false Some None Ok Err",
        built_in: a,
      },
      lexemes: e.IDENT_RE + "!?",
      illegal: "</",
      contains: [
        e.C_LINE_COMMENT_MODE,
        e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
        e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
        {
          className: "string",
          variants: [
            { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
            { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ },
          ],
        },
        { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ },
        {
          className: "number",
          variants: [
            { begin: "\\b0b([01_]+)" + n },
            { begin: "\\b0o([0-7_]+)" + n },
            { begin: "\\b0x([A-Fa-f0-9_]+)" + n },
            { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n },
          ],
          relevance: 0,
        },
        {
          className: "function",
          beginKeywords: "fn",
          end: "(\\(|<)",
          excludeEnd: !0,
          contains: [e.UNDERSCORE_TITLE_MODE],
        },
        {
          className: "meta",
          begin: "#\\!?\\[",
          end: "\\]",
          contains: [{ className: "meta-string", begin: /"/, end: /"/ }],
        },
        {
          className: "class",
          beginKeywords: "type",
          end: ";",
          contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: !0 })],
          illegal: "\\S",
        },
        {
          className: "class",
          beginKeywords: "trait enum struct union",
          end: "{",
          contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: !0 })],
          illegal: "[\\w\\d]",
        },
        { begin: e.IDENT_RE + "::", keywords: { built_in: a } },
        { begin: "->" },
      ],
    };
  }
  function S(e) {
    var n = {
        className: "subst",
        variants: [{ begin: "\\$[A-Za-z0-9_]+" }, { begin: "\\${", end: "}" }],
      },
      n = {
        className: "string",
        variants: [
          {
            begin: '"',
            end: '"',
            illegal: "\\n",
            contains: [e.BACKSLASH_ESCAPE],
          },
          { begin: '"""', end: '"""', relevance: 10 },
          {
            begin: '[a-z]+"',
            end: '"',
            illegal: "\\n",
            contains: [e.BACKSLASH_ESCAPE, n],
          },
          {
            className: "string",
            begin: '[a-z]+"""',
            end: '"""',
            contains: [n],
            relevance: 10,
          },
        ],
      },
      a = { className: "type", begin: "\\b[A-Z][A-Za-z0-9_]*", relevance: 0 },
      t = {
        className: "title",
        begin:
          /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        relevance: 0,
      };
    return {
      keywords: {
        literal: "true false null",
        keyword:
          "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit",
      },
      contains: [
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        n,
        { className: "symbol", begin: "'\\w[\\w\\d_]*(?!')" },
        a,
        {
          className: "function",
          beginKeywords: "def",
          end: /[:={\[(\n;]/,
          excludeEnd: !0,
          contains: [t],
        },
        {
          className: "class",
          beginKeywords: "class object trait type",
          end: /[:={\[\n;]/,
          excludeEnd: !0,
          contains: [
            { beginKeywords: "extends with", relevance: 10 },
            {
              begin: /\[/,
              end: /\]/,
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0,
              contains: [a],
            },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0,
              contains: [a],
            },
            t,
          ],
        },
        e.C_NUMBER_MODE,
        { className: "meta", begin: "@[A-Za-z]+" },
      ],
    };
  }
  function T(e) {
    return {
      aliases: ["console"],
      contains: [
        {
          className: "meta",
          begin: "^\\s{0,3}[/\\w\\d\\[\\]()@-]*[>%$#]",
          starts: { end: "$", subLanguage: "bash" },
        },
      ],
    };
  }
  function k(e) {
    var n = e.COMMENT("--", "$");
    return {
      case_insensitive: !0,
      illegal: /[<>{}*]/,
      contains: [
        {
          beginKeywords:
            "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
          end: /;/,
          endsWithParent: !0,
          lexemes: /[\w\.]+/,
          keywords: {
            keyword:
              "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
            literal: "true false null unknown",
            built_in:
              "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void",
          },
          contains: [
            {
              className: "string",
              begin: "'",
              end: "'",
              contains: [{ begin: "''" }],
            },
            {
              className: "string",
              begin: '"',
              end: '"',
              contains: [{ begin: '""' }],
            },
            { className: "string", begin: "`", end: "`" },
            e.C_NUMBER_MODE,
            e.C_BLOCK_COMMENT_MODE,
            n,
            e.HASH_COMMENT_MODE,
          ],
        },
        e.C_BLOCK_COMMENT_MODE,
        n,
        e.HASH_COMMENT_MODE,
      ],
    };
  }
  function A(e) {
    var n = {
        keyword:
          "#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in:
          "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip",
      },
      a = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
      t = {
        className: "subst",
        begin: /\\\(/,
        end: "\\)",
        keywords: n,
        contains: [],
      },
      i = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          { begin: /"""/, end: /"""/ },
          { begin: /"/, end: /"/ },
        ],
      },
      s = {
        className: "number",
        begin:
          "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
        relevance: 0,
      };
    return (
      (t.contains = [s]),
      {
        keywords: n,
        contains: [
          i,
          e.C_LINE_COMMENT_MODE,
          a,
          { className: "type", begin: "\\b[A-Z][\\wÀ-ʸ']*[!?]" },
          { className: "type", begin: "\\b[A-Z][\\wÀ-ʸ']*", relevance: 0 },
          s,
          {
            className: "function",
            beginKeywords: "func",
            end: "{",
            excludeEnd: !0,
            contains: [
              e.inherit(e.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }),
              { begin: /</, end: />/ },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: !0,
                keywords: n,
                contains: [
                  "self",
                  s,
                  i,
                  e.C_BLOCK_COMMENT_MODE,
                  { begin: ":" },
                ],
                illegal: /["']/,
              },
            ],
            illegal: /\[|%/,
          },
          {
            className: "class",
            beginKeywords: "struct protocol class extension enum",
            keywords: n,
            end: "\\{",
            excludeEnd: !0,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/,
              }),
            ],
          },
          {
            className: "meta",
            begin:
              "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper)",
          },
          {
            beginKeywords: "import",
            end: /$/,
            contains: [e.C_LINE_COMMENT_MODE, a],
          },
        ],
      }
    );
  }
  function R(e) {
    var n = { className: "symbol", begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;" },
      a = {
        begin: "\\s",
        contains: [
          {
            className: "meta-keyword",
            begin: "#?[a-z_][a-z1-9_-]+",
            illegal: "\\n",
          },
        ],
      },
      t = e.inherit(a, { begin: "\\(", end: "\\)" }),
      i = e.inherit(e.APOS_STRING_MODE, { className: "meta-string" }),
      s = e.inherit(e.QUOTE_STRING_MODE, { className: "meta-string" }),
      r = {
        endsWithParent: !0,
        illegal: /</,
        relevance: 0,
        contains: [
          { className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0 },
          {
            begin: /=\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: !0,
                variants: [
                  { begin: /"/, end: /"/, contains: [n] },
                  { begin: /'/, end: /'/, contains: [n] },
                  { begin: /[^\s"'=<>`]+/ },
                ],
              },
            ],
          },
        ],
      };
    return {
      aliases: [
        "html",
        "xhtml",
        "rss",
        "atom",
        "xjb",
        "xsd",
        "xsl",
        "plist",
        "wsf",
        "svg",
      ],
      case_insensitive: !0,
      contains: [
        {
          className: "meta",
          begin: "<![a-z]",
          end: ">",
          relevance: 10,
          contains: [
            a,
            s,
            i,
            t,
            {
              begin: "\\[",
              end: "\\]",
              contains: [
                {
                  className: "meta",
                  begin: "<![a-z]",
                  end: ">",
                  contains: [a, t, s, i],
                },
              ],
            },
          ],
        },
        e.COMMENT("\x3c!--", "--\x3e", { relevance: 10 }),
        { begin: "<\\!\\[CDATA\\[", end: "\\]\\]>", relevance: 10 },
        n,
        { className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10 },
        {
          begin: /<\?(php)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            { begin: "/\\*", end: "\\*/", skip: !0 },
            { begin: 'b"', end: '"', skip: !0 },
            { begin: "b'", end: "'", skip: !0 },
            e.inherit(e.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: !0,
            }),
            e.inherit(e.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: !0,
            }),
          ],
        },
        {
          className: "tag",
          begin: "<style(?=\\s|>)",
          end: ">",
          keywords: { name: "style" },
          contains: [r],
          starts: {
            end: "</style>",
            returnEnd: !0,
            subLanguage: ["css", "xml"],
          },
        },
        {
          className: "tag",
          begin: "<script(?=\\s|>)",
          end: ">",
          keywords: { name: "script" },
          contains: [r],
          starts: {
            end: "</script>",
            returnEnd: !0,
            subLanguage: ["actionscript", "javascript", "handlebars", "xml"],
          },
        },
        {
          className: "tag",
          begin: "</?",
          end: "/?>",
          contains: [
            { className: "name", begin: /[^\/><\s]+/, relevance: 0 },
            r,
          ],
        },
      ],
    };
  }
  function B(e) {
    var n = "true false yes no null",
      a = {
        className: "string",
        relevance: 0,
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /\S+/ },
        ],
        contains: [
          e.BACKSLASH_ESCAPE,
          {
            className: "template-variable",
            variants: [
              { begin: "{{", end: "}}" },
              { begin: "%{", end: "}" },
            ],
          },
        ],
      };
    return {
      case_insensitive: !0,
      aliases: ["yml", "YAML", "yaml"],
      contains: [
        {
          className: "attr",
          variants: [
            { begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)" },
            { begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' },
            { begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)" },
          ],
        },
        { className: "meta", begin: "^---s*$", relevance: 10 },
        {
          className: "string",
          begin: "[\\|>]([0-9]?[+-])?[ ]*\\n( *)[\\S ]+\\n(\\2[\\S ]+\\n?)*",
        },
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: !0,
          excludeEnd: !0,
          relevance: 0,
        },
        { className: "type", begin: "!" + e.UNDERSCORE_IDENT_RE },
        { className: "type", begin: "!!" + e.UNDERSCORE_IDENT_RE },
        { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "meta", begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "bullet", begin: "\\-(?=[ ]|$)", relevance: 0 },
        e.HASH_COMMENT_MODE,
        { beginKeywords: n, keywords: { literal: n } },
        { className: "number", begin: e.C_NUMBER_RE + "\\b" },
        a,
      ],
    };
  }
  var D,
    L,
    I = {};
  (D = function (t) {
    var a,
      g = [],
      s = Object.keys,
      w = Object.create(null),
      r = Object.create(null),
      O = !0,
      n = /^(no-?highlight|plain|text)$/i,
      l = /\blang(?:uage)?-([\w-]+)\b/i,
      i = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
      M = "</span>",
      x =
        "Could not find the language '{}', did you forget to load/include a language module?",
      C = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0,
      },
      o = "of and for in not or if then".split(" ");
    function S(e) {
      return e
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    function u(e) {
      return e.nodeName.toLowerCase();
    }
    function c(e) {
      return n.test(e);
    }
    function d(e) {
      var n,
        a = {},
        t = Array.prototype.slice.call(arguments, 1);
      for (n in e) a[n] = e[n];
      return (
        t.forEach(function (e) {
          for (n in e) a[n] = e[n];
        }),
        a
      );
    }
    function _(e) {
      var i = [];
      return (
        (function e(n, a) {
          for (var t = n.firstChild; t; t = t.nextSibling)
            3 === t.nodeType
              ? (a += t.nodeValue.length)
              : 1 === t.nodeType &&
                (i.push({ event: "start", offset: a, node: t }),
                (a = e(t, a)),
                u(t).match(/br|hr|img|input/) ||
                  i.push({ event: "stop", offset: a, node: t }));
          return a;
        })(e, 0),
        i
      );
    }
    function m(e, n, a) {
      var t = 0,
        i = "",
        s = [];
      function r() {
        return e.length && n.length
          ? e[0].offset !== n[0].offset
            ? e[0].offset < n[0].offset
              ? e
              : n
            : "start" === n[0].event
              ? e
              : n
          : e.length
            ? e
            : n;
      }
      function l(e) {
        i +=
          "<" +
          u(e) +
          g.map
            .call(e.attributes, function (e) {
              return (
                " " +
                e.nodeName +
                '="' +
                S(e.value).replace(/"/g, "&quot;") +
                '"'
              );
            })
            .join("") +
          ">";
      }
      function o(e) {
        i += "</" + u(e) + ">";
      }
      function c(e) {
        ("start" === e.event ? l : o)(e.node);
      }
      for (; e.length || n.length; ) {
        var d = r();
        if (
          ((i += S(a.substring(t, d[0].offset))), (t = d[0].offset), d === e)
        ) {
          for (
            s.reverse().forEach(o);
            c(d.splice(0, 1)[0]),
              (d = r()) === e && d.length && d[0].offset === t;

          );
          s.reverse().forEach(l);
        } else
          "start" === d[0].event ? s.push(d[0].node) : s.pop(),
            c(d.splice(0, 1)[0]);
      }
      return i + S(a.substr(t));
    }
    function b(n) {
      return (
        n.variants &&
          !n.cached_variants &&
          (n.cached_variants = n.variants.map(function (e) {
            return d(n, { variants: null }, e);
          })),
        n.cached_variants ||
          ((function e(n) {
            return !!n && (n.endsWithParent || e(n.starts));
          })(n)
            ? [d(n, { starts: n.starts ? d(n.starts) : null })]
            : Object.isFrozen(n)
              ? [d(n)]
              : [n])
      );
    }
    function p(e) {
      if (a && !e.langApiRestored) {
        for (var n in ((e.langApiRestored = !0), a)) e[n] && (e[a[n]] = e[n]);
        (e.contains || []).concat(e.variants || []).forEach(p);
      }
    }
    function f(n, t) {
      var i = {};
      return (
        "string" == typeof n
          ? a("keyword", n)
          : s(n).forEach(function (e) {
              a(e, n[e]);
            }),
        i
      );
      function a(a, e) {
        (e = t ? e.toLowerCase() : e).split(" ").forEach(function (e) {
          var n,
            e = e.split("|");
          i[e[0]] = [
            a,
            ((n = e[0]),
            (e = e[1])
              ? Number(e)
              : (function (e) {
                    return -1 != o.indexOf(e.toLowerCase());
                  })(n)
                ? 0
                : 1),
          ];
        });
      }
    }
    function T(t) {
      function d(e) {
        return (e && e.source) || e;
      }
      function g(e, n) {
        return new RegExp(
          d(e),
          "m" + (t.case_insensitive ? "i" : "") + (n ? "g" : ""),
        );
      }
      function i(i) {
        var s = {},
          r = [],
          l = {},
          a = 1;
        function e(e, n) {
          (s[a] = e),
            r.push([e, n]),
            (a += new RegExp(n.toString() + "|").exec("").length - 1 + 1);
        }
        for (var n = 0; n < i.contains.length; n++) {
          var t,
            o = (t = i.contains[n]).beginKeywords
              ? "\\.?(?:" + t.begin + ")\\.?"
              : t.begin;
          e(t, o);
        }
        i.terminator_end && e("end", i.terminator_end),
          i.illegal && e("illegal", i.illegal);
        var c = g(
          (function (e, n) {
            for (
              var a = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,
                t = 0,
                i = "",
                s = 0;
              s < e.length;
              s++
            ) {
              var r = (t += 1),
                l = d(e[s]);
              for (0 < s && (i += n), i += "("; 0 < l.length; ) {
                var o = a.exec(l);
                if (null == o) {
                  i += l;
                  break;
                }
                (i += l.substring(0, o.index)),
                  (l = l.substring(o.index + o[0].length)),
                  "\\" == o[0][0] && o[1]
                    ? (i += "\\" + String(Number(o[1]) + r))
                    : ((i += o[0]), "(" == o[0] && t++);
              }
              i += ")";
            }
            return i;
          })(
            r.map(function (e) {
              return e[1];
            }),
            "|",
          ),
          !0,
        );
        return (
          (l.lastIndex = 0),
          (l.exec = function (e) {
            var n;
            if (0 === r.length) return null;
            c.lastIndex = l.lastIndex;
            var a = c.exec(e);
            if (!a) return null;
            for (var t = 0; t < a.length; t++)
              if (null != a[t] && null != s["" + t]) {
                n = s["" + t];
                break;
              }
            return (
              "string" == typeof n
                ? ((a.type = n), (a.extra = [i.illegal, i.terminator_end]))
                : ((a.type = "begin"), (a.rule = n)),
              a
            );
          }),
          l
        );
      }
      if (t.contains && -1 != t.contains.indexOf("self")) {
        if (!O)
          throw new Error(
            "ERR: contains `self` is not supported at the top-level of a language.  See documentation.",
          );
        t.contains = t.contains.filter(function (e) {
          return "self" != e;
        });
      }
      !(function n(a, e) {
        a.compiled ||
          ((a.compiled = !0),
          (a.keywords = a.keywords || a.beginKeywords),
          a.keywords && (a.keywords = f(a.keywords, t.case_insensitive)),
          (a.lexemesRe = g(a.lexemes || /\w+/, !0)),
          e &&
            (a.beginKeywords &&
              (a.begin =
                "\\b(" + a.beginKeywords.split(" ").join("|") + ")\\b"),
            a.begin || (a.begin = /\B|\b/),
            (a.beginRe = g(a.begin)),
            a.endSameAsBegin && (a.end = a.begin),
            a.end || a.endsWithParent || (a.end = /\B|\b/),
            a.end && (a.endRe = g(a.end)),
            (a.terminator_end = d(a.end) || ""),
            a.endsWithParent) &&
            e.terminator_end &&
            (a.terminator_end += (a.end ? "|" : "") + e.terminator_end),
          a.illegal && (a.illegalRe = g(a.illegal)),
          null == a.relevance && (a.relevance = 1),
          a.contains || (a.contains = []),
          (a.contains = Array.prototype.concat.apply(
            [],
            a.contains.map(function (e) {
              return b("self" === e ? a : e);
            }),
          )),
          a.contains.forEach(function (e) {
            n(e, a);
          }),
          a.starts && n(a.starts, e),
          (a.terminators = i(a)));
      })(t);
    }
    function k(n, e, t, a) {
      var i = e;
      function s(e, n, a, t) {
        return a || "" !== n
          ? e
            ? ((t = '<span class="' + (t ? "" : C.classPrefix)),
              (t += e + '">') + n + (a ? "" : M))
            : n
          : "";
      }
      function r() {
        var e, n, a, t, i;
        if (!m.keywords) return S(E);
        for (
          a = "", m.lexemesRe.lastIndex = e = 0, n = m.lexemesRe.exec(E);
          n;

        )
          (a += S(E.substring(e, n.index))),
            (t = m),
            (i = n),
            (i = _.case_insensitive ? i[0].toLowerCase() : i[0]),
            (t = t.keywords.hasOwnProperty(i) && t.keywords[i])
              ? ((N += t[1]), (a += s(t[0], S(n[0]))))
              : (a += S(n[0])),
            (e = m.lexemesRe.lastIndex),
            (n = m.lexemesRe.exec(E));
        return a + S(E.substr(e));
      }
      function l() {
        var e, n;
        (p +=
          null != m.subLanguage
            ? (n = "string" == typeof m.subLanguage) && !w[m.subLanguage]
              ? S(E)
              : ((e = n
                  ? k(m.subLanguage, E, !0, b[m.subLanguage])
                  : A(E, m.subLanguage.length ? m.subLanguage : void 0)),
                0 < m.relevance && (N += e.relevance),
                n && (b[m.subLanguage] = e.top),
                s(e.language, e.value, !1, !0))
            : r()),
          (E = "");
      }
      function o(e) {
        (p += e.className ? s(e.className, "", !0) : ""),
          (m = Object.create(e, { parent: { value: m } }));
      }
      function c(e) {
        var n = e[0],
          e = e.rule;
        return (
          e &&
            e.endSameAsBegin &&
            (e.endRe = new RegExp(
              n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "m",
            )),
          e.skip
            ? (E += n)
            : (e.excludeBegin && (E += n),
              l(),
              e.returnBegin || e.excludeBegin || (E = n)),
          o(e),
          e.returnBegin ? 0 : n.length
        );
      }
      function d(e) {
        var n = e[0],
          e = i.substr(e.index),
          a = (function e(n, a) {
            if (
              ((t = n.endRe), (i = a), (t = t && t.exec(i)) && 0 === t.index)
            ) {
              for (; n.endsParent && n.parent; ) n = n.parent;
              return n;
            }
            var t, i;
            if (n.endsWithParent) return e(n.parent, a);
          })(m, e);
        if (a) {
          e = m;
          for (
            e.skip
              ? (E += n)
              : (e.returnEnd || e.excludeEnd || (E += n),
                l(),
                e.excludeEnd && (E = n));
            m.className && (p += M),
              m.skip || m.subLanguage || (N += m.relevance),
              (m = m.parent) !== a.parent;

          );
          return (
            a.starts &&
              (a.endSameAsBegin && (a.starts.endRe = a.endRe), o(a.starts)),
            e.returnEnd ? 0 : n.length
          );
        }
      }
      var g = {};
      function u(e, n) {
        var a = n && n[0];
        if (((E += e), null == a)) return l(), 0;
        if (
          "begin" == g.type &&
          "end" == n.type &&
          g.index == n.index &&
          "" === a
        )
          return (E += i.slice(n.index, n.index + 1)), 1;
        if ("illegal" === g.type && "" === a)
          return (E += i.slice(n.index, n.index + 1)), 1;
        if ("begin" === (g = n).type) return c(n);
        if ("illegal" === n.type && !t)
          throw new Error(
            'Illegal lexeme "' +
              a +
              '" for mode "' +
              (m.className || "<unnamed>") +
              '"',
          );
        if ("end" === n.type) {
          e = d(n);
          if (null != e) return e;
        }
        return (E += a), a.length;
      }
      var _ = R(n);
      if (!_)
        throw (
          (console.error(x.replace("{}", n)),
          new Error('Unknown language: "' + n + '"'))
        );
      T(_);
      for (var m = a || _, b = {}, p = "", f = m; f !== _; f = f.parent)
        f.className && (p = s(f.className, "", !0) + p);
      var E = "",
        N = 0;
      try {
        for (var h, v, y = 0; ; ) {
          if (((m.terminators.lastIndex = y), !(h = m.terminators.exec(i))))
            break;
          (v = u(i.substring(y, h.index), h)), (y = h.index + v);
        }
        for (u(i.substr(y)), f = m; f.parent; f = f.parent)
          f.className && (p += M);
        return { relevance: N, value: p, illegal: !1, language: n, top: m };
      } catch (e) {
        if (e.message && -1 !== e.message.indexOf("Illegal"))
          return { illegal: !0, relevance: 0, value: S(i) };
        if (O)
          return {
            relevance: 0,
            value: S(i),
            language: n,
            top: m,
            errorRaised: e,
          };
        throw e;
      }
    }
    function A(a, e) {
      e = e || C.languages || s(w);
      var t = { relevance: 0, value: S(a) },
        i = t;
      return (
        e
          .filter(R)
          .filter(y)
          .forEach(function (e) {
            var n = k(e, a, !1);
            (n.language = e),
              n.relevance > i.relevance && (i = n),
              n.relevance > t.relevance && ((i = t), (t = n));
          }),
        i.language && (t.second_best = i),
        t
      );
    }
    function E(e) {
      return C.tabReplace || C.useBR
        ? e.replace(i, function (e, n) {
            return C.useBR && "\n" === e
              ? "<br>"
              : C.tabReplace
                ? n.replace(/\t/g, C.tabReplace)
                : "";
          })
        : e;
    }
    function N(e) {
      var n,
        a,
        t,
        i,
        s = (function (e) {
          var n,
            a,
            t,
            i,
            s,
            r = e.className + " ";
          if (
            ((r += e.parentNode ? e.parentNode.className : ""), (a = l.exec(r)))
          )
            return (
              (s = R(a[1])) ||
                (console.warn(x.replace("{}", a[1])),
                console.warn(
                  "Falling back to no-highlight mode for this block.",
                  e,
                )),
              s ? a[1] : "no-highlight"
            );
          for (n = 0, t = (r = r.split(/\s+/)).length; n < t; n++)
            if (c((i = r[n])) || R(i)) return i;
        })(e);
      c(s) ||
        (C.useBR
          ? ((a = document.createElement("div")).innerHTML = e.innerHTML
              .replace(/\n/g, "")
              .replace(/<br[ \/]*>/g, "\n"))
          : (a = e),
        (i = a.textContent),
        (n = s ? k(s, i, !0) : A(i)),
        (a = _(a)).length &&
          (((t = document.createElement("div")).innerHTML = n.value),
          (n.value = m(a, _(t), i))),
        (n.value = E(n.value)),
        (e.innerHTML = n.value),
        (e.className =
          ((a = e.className),
          (t = s),
          (i = n.language),
          (t = t ? r[t] : i),
          (i = [a.trim()]),
          a.match(/\bhljs\b/) || i.push("hljs"),
          -1 === a.indexOf(t) && i.push(t),
          i.join(" ").trim())),
        (e.result = { language: n.language, re: n.relevance }),
        n.second_best &&
          (e.second_best = {
            language: n.second_best.language,
            re: n.second_best.relevance,
          }));
    }
    function h() {
      var e;
      h.called ||
        ((h.called = !0),
        (e = document.querySelectorAll("pre code")),
        g.forEach.call(e, N));
    }
    var v = { disableAutodetect: !0 };
    function R(e) {
      return (e = (e || "").toLowerCase()), w[e] || w[r[e]];
    }
    function y(e) {
      e = R(e);
      return e && !e.disableAutodetect;
    }
    return (
      (t.highlight = k),
      (t.highlightAuto = A),
      (t.fixMarkup = E),
      (t.highlightBlock = N),
      (t.configure = function (e) {
        C = d(C, e);
      }),
      (t.initHighlighting = h),
      (t.initHighlightingOnLoad = function () {
        window.addEventListener("DOMContentLoaded", h, !1),
          window.addEventListener("load", h, !1);
      }),
      (t.registerLanguage = function (n, e) {
        var a;
        try {
          a = e(t);
        } catch (e) {
          if (
            (console.error(
              "Language definition for '{}' could not be registered.".replace(
                "{}",
                n,
              ),
            ),
            !O)
          )
            throw e;
          console.error(e), (a = v);
        }
        p((w[n] = a)),
          (a.rawDefinition = e.bind(null, t)),
          a.aliases &&
            a.aliases.forEach(function (e) {
              r[e] = n;
            });
      }),
      (t.listLanguages = function () {
        return s(w);
      }),
      (t.getLanguage = R),
      (t.requireLanguage = function (e) {
        var n = R(e);
        if (n) return n;
        throw new Error(
          "The '{}' language is required, but not loaded.".replace("{}", e),
        );
      }),
      (t.autoDetection = y),
      (t.inherit = d),
      (t.debugMode = function () {
        O = !1;
      }),
      (t.IDENT_RE = "[a-zA-Z]\\w*"),
      (t.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*"),
      (t.NUMBER_RE = "\\b\\d+(\\.\\d+)?"),
      (t.C_NUMBER_RE =
        "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
      (t.BINARY_NUMBER_RE = "\\b(0b[01]+)"),
      (t.RE_STARTERS_RE =
        "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
      (t.BACKSLASH_ESCAPE = { begin: "\\\\[\\s\\S]", relevance: 0 }),
      (t.APOS_STRING_MODE = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [t.BACKSLASH_ESCAPE],
      }),
      (t.QUOTE_STRING_MODE = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [t.BACKSLASH_ESCAPE],
      }),
      (t.PHRASAL_WORDS_MODE = {
        begin:
          /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
      }),
      (t.COMMENT = function (e, n, a) {
        e = t.inherit(
          { className: "comment", begin: e, end: n, contains: [] },
          a || {},
        );
        return (
          e.contains.push(t.PHRASAL_WORDS_MODE),
          e.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            relevance: 0,
          }),
          e
        );
      }),
      (t.C_LINE_COMMENT_MODE = t.COMMENT("//", "$")),
      (t.C_BLOCK_COMMENT_MODE = t.COMMENT("/\\*", "\\*/")),
      (t.HASH_COMMENT_MODE = t.COMMENT("#", "$")),
      (t.NUMBER_MODE = {
        className: "number",
        begin: t.NUMBER_RE,
        relevance: 0,
      }),
      (t.C_NUMBER_MODE = {
        className: "number",
        begin: t.C_NUMBER_RE,
        relevance: 0,
      }),
      (t.BINARY_NUMBER_MODE = {
        className: "number",
        begin: t.BINARY_NUMBER_RE,
        relevance: 0,
      }),
      (t.CSS_NUMBER_MODE = {
        className: "number",
        begin:
          t.NUMBER_RE +
          "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0,
      }),
      (t.REGEXP_MODE = {
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [
          t.BACKSLASH_ESCAPE,
          {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [t.BACKSLASH_ESCAPE],
          },
        ],
      }),
      (t.TITLE_MODE = { className: "title", begin: t.IDENT_RE, relevance: 0 }),
      (t.UNDERSCORE_TITLE_MODE = {
        className: "title",
        begin: t.UNDERSCORE_IDENT_RE,
        relevance: 0,
      }),
      (t.METHOD_GUARD = {
        begin: "\\.\\s*" + t.UNDERSCORE_IDENT_RE,
        relevance: 0,
      }),
      [
        t.BACKSLASH_ESCAPE,
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE,
        t.PHRASAL_WORDS_MODE,
        t.COMMENT,
        t.C_LINE_COMMENT_MODE,
        t.C_BLOCK_COMMENT_MODE,
        t.HASH_COMMENT_MODE,
        t.NUMBER_MODE,
        t.C_NUMBER_MODE,
        t.BINARY_NUMBER_MODE,
        t.CSS_NUMBER_MODE,
        t.REGEXP_MODE,
        t.TITLE_MODE,
        t.UNDERSCORE_TITLE_MODE,
        t.METHOD_GUARD,
      ].forEach(function (e) {
        !(function n(a) {
          Object.freeze(a);
          var t = "function" == typeof a;
          Object.getOwnPropertyNames(a).forEach(function (e) {
            !a.hasOwnProperty(e) ||
              null === a[e] ||
              ("object" != typeof a[e] && "function" != typeof a[e]) ||
              (t && ("caller" === e || "callee" === e || "arguments" === e)) ||
              Object.isFrozen(a[e]) ||
              n(a[e]);
          });
          return a;
        })(e);
      }),
      t
    );
  }),
    (L =
      ("object" == typeof window && window) ||
      ("object" == typeof self && self)),
    void 0 === I || I.nodeType
      ? L &&
        ((L.hljs = D({})), "function" == typeof define) &&
        define.amd &&
        define([], function () {
          return L.hljs;
        })
      : D(I);
  !(function () {
    "use strict";
    I.registerLanguage("asciidoc", e),
      I.registerLanguage("bash", n),
      I.registerLanguage("clojure", a),
      I.registerLanguage("cpp", t),
      I.registerLanguage("cs", i),
      I.registerLanguage("css", s),
      I.registerLanguage("diff", r),
      I.registerLanguage("dockerfile", l),
      I.registerLanguage("elixir", o),
      I.registerLanguage("go", c),
      I.registerLanguage("groovy", d),
      I.registerLanguage("haskell", g),
      I.registerLanguage("java", u),
      I.registerLanguage("javascript", _),
      I.registerLanguage("json", m),
      I.registerLanguage("kotlin", b),
      I.registerLanguage("lua", p),
      I.registerLanguage("markdown", f),
      I.registerLanguage("nix", E),
      I.registerLanguage("none", N),
      I.registerLanguage("objectivec", h),
      I.registerLanguage("perl", v),
      I.registerLanguage("php", y),
      I.registerLanguage("properties", w),
      I.registerLanguage("puppet", O),
      I.registerLanguage("python", M),
      I.registerLanguage("ruby", x),
      I.registerLanguage("rust", C),
      I.registerLanguage("scala", S),
      I.registerLanguage("shell", T),
      I.registerLanguage("sql", k),
      I.registerLanguage("swift", A),
      I.registerLanguage("xml", R),
      I.registerLanguage("yaml", B),
      I.registerLanguage("idl", function (e) {
        return {
          name: "IDL",
          case_insensitive: !1,
          keywords:
            "if else for return returns arguments builtin function enum bitfield",
          literal: "true false $pc $encoding",
          contains: [
            e.HASH_COMMENT_MODE,
            {
              className: "comment",
              variants: [{ begin: "(?<=description\\s*){", end: "}" }],
            },
            {
              className: "type",
              variants: [
                { begin: "\\b(Bits)\\s*<(?!<)", end: ">" },
                { begin: "XReg" },
                { begin: "U32" },
                { begin: "U64" },
              ],
            },
            {
              scope: "string",
              begin: '"',
              end: '"',
            },
            {
              className: "number",
              variants: [
                { begin: /((\d+'(s?([bhodBHOD])?))[0-9xzXZa-fA-F_]+)/ },
                { begin: /(('(s?([bhodBHOD])?))[0-9xzXZa-fA-F_]+)/ },
                {
                  begin:
                    "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)s?",
                },
                { begin: /\b[0-9][0-9_]*/, relevance: 0 },
              ],
            },
          ],
        };
      }),
      [].slice
        .call(document.querySelectorAll("pre code.hljs[data-lang]"))
        .forEach(function (e) {
          I.highlightBlock(e);
        });
  })();
})();
