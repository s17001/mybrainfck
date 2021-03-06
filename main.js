(stdin => {

    // Declare Variable
    const inputs  = [...stdin+[]]
    let outputs = '';
    // Main Procedure
    console.log(outputs)


    // ASCII文字。制御文字は単なる文字列で代用
    const chars = [
        '<NUL>', '<SOH>', '<STX>', '<ETX>', '<EOT>', '<ENQ>', '<ACK>', '<BEL>',
        '<BS>', '<HT>', '<LF>', '<VT>', '<NP>', '<CR>', '<SO>', '<SI>',
        '<DLE>', '<DC1>', '<DC2>', '<DC3>', '<DC4>', '<NAK>', '<SYN>', '<ETB>',
        '<CAN>', '<EM>', '<SUB>', '<ESC>', '<FS>', '<GS>', '<RS>', '<US>',
        ' ', '!', '"', '#', '$', '%', '&', '\'',
        '(', ')', '*', '+', ',', '-', '.', '/',
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', ':', ';', '<', '=', '>', '?',
        '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'L', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
        '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
        'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
    ];

    let pointer = 0;  // ポインタ。メモリのインデックス
    let memory = []; // メモリに見せかけた単なる配列

    let braces = []; // 括弧の対応
    let brace_stack = []; // 括弧の対応チェック用

// メモリを初期化
    let release = function () {
        for (let i = 0; i < 256; ++i) {
            memory[i] = 0;
        }
        pointer = 0;
        braces = [];
        brace_stack = [];
    };

// 入力を括弧の対応を取って配列に格納
    let check_brace = function (input) {
        for (let i in input) {
            let command = input[i];

            if (command == '[') {
                let j = i;

                while (true) {
                    if (input.length <= j) {
                        throw 'check_brace!!!invalid brace pare';
                    }

                    if (input[j] == '[') {
                        brace_stack.push(1);
                    }
                    else if (input[j] == ']') {
                        brace_stack.pop();
                    }

                    if (brace_stack.length == 0) {
                        break;
                    }

                    ++j;
                }

                braces[i - 0] = j - 0;
                braces[j - 0] = i - 0;
            }
        }
    };

// 入力を評価 配列とって of使うやつにする
    let eval_input = function (inputarr) {
        let output = '';

        for (let i of inputarr) {

            switch (i) {
                case '>': pointer++; break;
                case '<': pointer--; break;
                case '+': memory[pointer]++; break;
                case '-': memory[pointer]--; break;
                case '.': output += chars[memory[pointer]]; break;
                case '[': memory[pointer] == 0 && (i = braces[i] + 1); break;
                case ']': memory[pointer] != 0 && (i = braces[i]); break;
            }

            console.log(memory[pointer])
            if (pointer < 0 || memory.length <= pointer) {
                console.log( memory.length , pointer)
                throw 'eval_input!! pointer out of range (' + pointer + ')';
            }
        }

        return output;
    };

/////////////////////////////// 開始
        try {
            check_brace(inputs);
            outputs = eval_input(inputs);
        } catch (e) {
            outputs = e;
        }

        release();

    console.log(outputs);

    release();


    // console.log(inputs)

})(require('fs').readFileSync('/dev/stdin', 'utf8'));