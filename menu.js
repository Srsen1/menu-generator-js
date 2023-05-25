class Menu
{
    constructor(html_input)
    {
        this.html_input = html_input;
    }


    get_raw_menu(html_input)
    {
        let result = [];
        let startOffset = 0;
        let endOffset = 0;

        while (true) {
            let start = html_input.indexOf("<h", startOffset);
            let end = html_input.indexOf("</h", endOffset);
            let weight = html_input[start+2];
            let semiResult = "";

            if(start == -1){
                break;
            }

            for (let i=start+4; i < end; i++) { 
                semiResult += html_input[i];
            }
            startOffset = end;
            endOffset = end+3;
            result.push([parseInt(weight), semiResult]);
        }
        return result;
    }


    get_menu()
    {
        let menu = "<ul>";
        let level = 1;

        for (let line of this.get_raw_menu(this.html_input)) {
            var get_to_level = line[0];
            let first = true;
            let change = true;

            while(true) {
                if(!first){
                    change = false;
                }
                if(get_to_level > level){
                    menu += "<ul>";
                    level++;
                    change = true;
                }else if(get_to_level < level){
                    menu += "</ul></li>";
                    level--;
                    change = true;
                }else{
                    menu += "<li>" + line[1];
                    if(!change){
                        menu += "</li>";
                    }
                    break;
                }
                first = false;
            }
        }
        while(level-1 > 0){
            menu += "</ul></li>";
            level--;
        }
        menu += "</ul>";
        return menu;
    }
}


let test = new Menu ('<h1>My Article</h1><h2>Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum diam ac augue commodo, id condimentum est vulputate. In tristique, felis non varius tempus, justo dolor convallis lectus, et lacinia ex nulla nec purus. Aenean id tempor tellus. Nam nec sem in nunc elementum aliquam vitae a risus. Proin sit amet lectus risus. Morbi bibendum dapibus orci. Mauris maximus ante mi, sit amet tincidunt ex dapibus non. Integer vitae pharetra est.</p><h2>Main Section</h2><h3>Subsection 1</h3><p>Aliquam tristique leo a tempor malesuada. Nunc interdum quam ut ante vulputate, at efficitur metus vulputate. Nulla facilisi. Aliquam feugiat velit id purus suscipit malesuada. Fusce vehicula purus quis nunc fringilla fringilla. Quisque aliquet erat sed neque tempor, ut interdum lectus dignissim. Cras blandit, metus vitae aliquet convallis, nisl sapien fringilla quam, sed sollicitudin nunc tellus nec nisi.</p><h3>Subsection 2</h3><p>Vestibulum gravida aliquam massa, sit amet interdum justo ultrices ac. Integer efficitur venenatis tellus ac condimentum. Maecenas id nunc enim. Nam et iaculis nulla. Nulla facilisi. Nam elementum est non leo ultrices sollicitudin. Fusce eleifend neque eu nisl posuere lobortis. Vivamus eu urna nec dui consectetur bibendum sed nec sem.</p><h4>Sub-subsection 2.1</h4><p>Nullam interdum consectetur tortor ut tempor. Morbi venenatis, turpis ac fringilla varius, urna elit interdum turpis, eu lobortis sem ligula at enim. Quisque euismod turpis urna, sed suscipit urna euismod vitae. Sed tempus tempor ex, nec cursus nisi. Mauris fermentum ligula non sapien commodo, a pulvinar tortor ullamcorper. Phasellus tempor, nunc sit amet tempor venenatis, risus elit ullamcorper elit, nec hendrerit risus velit non dolor. In ac mauris nec purus fringilla sagittis. Curabitur lobortis elit et nulla molestie, at pulvinar massa faucibus. Suspendisse vel velit non tellus viverra feugiat.</p><h2>Conclusion</h2><p class="author">Written by John Doe</p><p class="date">Published on May 25, 2023</p>');

document.write(test.get_menu());