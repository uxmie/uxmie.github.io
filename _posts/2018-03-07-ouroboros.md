---
layout: post
title: 自產生程式（中）：不動點、銜尾蛇、後門
catagories: computing math
---


## 前言

*（本文是一系列文章的第二篇。若對本文有不了解，可以參考[上篇]({% post_url 2018-02-19-quines %}) Quine 的基本介紹。）*

在寫作這兩篇文章時，初衷是這樣的：關於 Quine 的網路文章，大多分成兩種形式。一種以 Quine 大觀園的方式展覽各種程式語言下的 Quine，另一種會提供段程式碼，再逐行分析其指令。我想以更數理的方式，寫作 Quine 背後的邏輯。
於是閉門造車了一會兒，匆匆寫作了第一篇文章。而就在寫作第二篇文章時，查到了 [David Madore 教授的相關文章](http://www.madore.org/~david/computers/quine.html)。

當然，David Madore 教授專攻數學、密碼學，對於 Quine 這一話題的理解深入許多。而接下來的內容，也希望以他未觸及的話題為主。但在這之前，我們先擷取他的文章中的精要。

若兩個程式在同樣的輸入下有同樣的輸出（忽略執行時間），我們定義這兩個程式**等價**。在數理邏輯中，我們有**不動點定理 （Fixed-point theorem）**：

<div class="theorem">
令 \(h\) 為一個輸入參數為一個程式的程式，則存在一個程式 \(n\) ，使得 \(h(n)\) 和 \(n\) 等價。
</div>

有了不動點定理，Quine 的存在，在數學上便有了解釋。我們能寫出這樣的程式：輸入一個程式 $$c$$ ，則 $$h(c)$$ 會輸出 $$c$$ 的程式碼。由不動點定理，存在一個程式 $$q$$，使得 $$h(q)$$ 和 $$q$$ 等價。意即：$$q$$ 會輸出 $$q$$ 的程式碼。

我們也能發現 Quine 為不動點定理中的一個特例——既然 $$h$$ 可以是任意程式，透過它我們也可以得到以下的結論：

* 若 $$h(x)$$ 會輸出 $$x$$ 的 [sha256 雜湊值](https://zh.wikipedia.org/wiki/SHA-2)，則存在程式會輸出自己的 sha256 雜湊值。

* 若 $$h(x)$$ 會解壓縮 $$x$$，則存在一個壓縮檔，解壓縮完是自己。（稱為一個 zip Quine，[已有人實作](https://alf.nu/ZipQuine)）

* 有三個輸出、輸入為程式的程式 $$h_1$$、$$h_2$$、$$h_3$$，則存在一個程式 $$x$$，使得 $$h_1(h_2(h_3(x)))$$ 和 $$x$$ 等價。如果三個程式分別為不同的程式語言寫成，則稱為一個**銜尾蛇程式 (ouroboros)**。

第三種程式當然有不限定只用三種程式語言。有人在 Github 發表[使用 128 種語言的 ouroboros](https://github.com/mame/Quine-relay)。而這樣的程式究竟如何撰寫？Madore 教授如此寫道：

> This is too easy to do (we have proved the existence of such using the fixed-point theorem)

讀著讀著，就這麼被 trivial 了。哎呀呀呀呀……我們的第一個任務就這麼現身了。

## Ouroboros 怎麼寫？

Ouroboros 希望達到的目的如下：

> 試寫一個程式 A，會輸出一段程式 B，B 輸出程式 C …… 直到輸出原本的程式 A。其中所有的輸出皆為不同的程式語言。

由於使用了兩個不同的語言，我們先試試一個比較簡單的問題：

> 試寫一段程式 A，會輸出程式 B，B 輸出程式 A。A、B 使用同一個程式語言，但 A、B 為不同的程式。

這樣的程式也許更容易使用原本的 Quine 程式延伸而成：

{% highlight cpp linenos %}
char *s="char*s=%c%s%c;main(){printf(s,34,s,34);}";
main(){
    printf(s,34,s,34);
}

/*
實際上會輸出：char*s="char*s=%c%s%c;main(){printf(s,34,s,34);}";main(){printf(s,34,s,34);}
*/
{% endhighlight %}

為了下文的可讀性，所有程式皆不考慮空格、換行的問題。

在探討 Quine 時，我們曾經說 Quine 可以增加一些內容。如接下來的程式，一樣是一段 Quine：

{% highlight cpp linenos %}
char *s="char*s=%c%s%c,*a=%c%s%c,*b=%c%s%c;main(){printf(s,34,s,34,34,a,34,34,b,34);}",
     *a="hello",
     *b="world";
main(){
    printf(s,34,s,34,34,a,34,34,b,34);
}
{% endhighlight %}

此時若要解決上面的問題，只要把 a、b 的輸出順序調換就可以了：

{% highlight cpp linenos %}
char *s="char*s=%c%s%c,*a=%c%s%c,*b=%c%s%c;main(){printf(s,34,s,34,34,b,34,34,a,34);}",
     *a="hello",
     *b="world";
main(){
    printf(s,34,s,34,34,b,34,34,a,34);
}

/*
輸出：
char *s="char*s=%c%s%c,*a=%c%s%c,*b=%c%s%c;main(){printf(s,34,s,34,34,b,34,34,a,34);}",
     *a="world",  <----- 注意這兩行！！
     *b="hello";  <----- >
main(){
    printf(s,34,s,34,34,b,34,34,a,34);
}
*/
{% endhighlight %}

我們再次執行輸出的程式碼時，a 和 b 又會交換一次，回到原來的程式。這樣一來，我們就能達到原來的目的了！然而，在跨越語言之前還有最後一步需要處理。的確生成了兩個不一樣的程式，但是兩個程式使用了同一段輸出指令，這樣無法跨越不同語譂。如果要克服這個困難，我們首先可以把 s 字串直接包括在 a 字串中：

{% highlight cpp linenos %}
char *a="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *b="world";
main(){
    printf(a,34,b,34,34,a,34);
}

/*
輸出：
char *a="world",
     *b="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}";
main(){
    printf(a,34,b,34,34,a,34);
}
*/
{% endhighlight %}

如此一來輸出的程式無法再執行，但如果我們再改一下 b 字串的內容：

{% highlight cpp linenos %}
char *a="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *b="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}";
main(){
    printf(a,34,b,34,34,a,34);
}

/*
輸出：
char *a="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *b="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,b,34,34,a,34);}";
main(){
    printf(a,34,b,34,34,a,34);
}
*/
{% endhighlight %}

我們又回到了原先的狀況：一段程式碼輸出自己。但眼尖的讀者可能已經發現一件事，就是我們現在有了兩份輸出的指令。由於我們在 `printf()` 中交換了 a 和 b 的內容，雖然輸出了同一些文字，但邏輯上，a 和 b 已經互相交換。把 a 、b的內容改為邏輯相通，內容不同的兩段程式碼，可能更好比較兩者的差異：

{% highlight cpp linenos %}
char *a="char*b=%c%s%c,*a=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *b="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,a,34,34,b,34);}";
main(){
    printf(a,34,a,34,34,b,34);
}

/*
輸出：
char *b="char*b=%c%s%c,*a=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *a="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,a,34,34,b,34);}";
main(){
    printf(a,34,b,34,34,a,34);
}
*/
{% endhighlight %}

若再把輸出的程式執行一次，則會輸出：

{% highlight cpp linenos %}
char *a="char*b=%c%s%c,*a=%c%s%c;main(){printf(a,34,b,34,34,a,34);}",
     *b="char*a=%c%s%c,*b=%c%s%c;main(){printf(a,34,a,34,34,b,34);}";
main(){
    printf(a,34,a,34,34,b,34);
}
{% endhighlight %}

那麼，改寫到現在，到底怎麼跨越到另一個語言呢？這時就不難看出：很簡單，只需要把 a 換成第二個語言即可。這就是上一篇中 ouroboros 的原理，可以比較一下同一個語言和不同語言的差別：

{% highlight cpp linenos %}
#include <stdio.h>
int main() {
	char *a = "a = %c%s%c;%cb = %c%s%c;%cprint(a.format(b,a,chr(123),chr(125),chr(34),chr(10),chr(9)))",
	*b = "#include <stdio.h>{5}int main() {2}{5}{6}char *a = {4}{0}{4},{5}{6}*b = {4}{1}{4};{5}{6}printf(a,34,b,34,10,34,a,34,10);{5}{3}";
	printf(a,34,b,34,10,34,a,34,10);
}
{% endhighlight %}

值得注意的是，第二個語言的程式碼需要用第一個語言的跳脫字元，反之亦然。到此，使用三個語言以上的 ouroboros 原理也能輕推出：三個字串中的程式碼寫出三段Quine，但是每輸出一次，字串內容便輸換一次。以下一段三個語言的銜尾蛇，使用了 C 、Python、和 Bash。每一段都力求程式碼的可讀性。當然，這樣的代價就是得面對複雜的跳脫字元……

{% highlight cpp linenos %}
#include <stdio.h>
int main() { 
  char *a = "a = %c%s%c%cb = %c%s%c%cc = %c%s%c%cprint(a.format(chr(34),b,chr(10),c,a,chr(92),chr(39)))%c",
       *b = "#!/bin/bash{2}N=${6}{5}x0a{6}{2}Q=${6}{5}x22{6}{2}B={6}{3}{6}{2}C={6}{4}{6}{2}A={0}{1}{0}{2}printf {0}$A{0} {0}$N{0} {0}$N{0} {0}$Q{0} {0}$B{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$C{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$A{0} {0}$Q{0} {0}$N{0} {0}$N{0} {0}$N{0}{2}",
       *c = "#include <stdio.h>%sint main() { %s  char *a = %s%s%s,%s       *b = %s%s%s,%s       *c = %s%s%s;%s  printf(a,34,b,34,10,34,c,34,10,34,a,34,10);%s}%s";
  printf(a,34,b,34,10,34,c,34,10,34,a,34,10,10);
}

{% endhighlight %}

由此輸出的 Python 碼：

{% highlight python linenos %}
a = "#!/bin/bash{2}N=${6}{5}x0a{6}{2}Q=${6}{5}x22{6}{2}B={6}{3}{6}{2}C={6}{4}{6}{2}A={0}{1}{0}{2}printf {0}$A{0} {0}$N{0} {0}$N{0} {0}$Q{0} {0}$B{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$C{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$A{0} {0}$Q{0} {0}$N{0} {0}$N{0} {0}$N{0}{2}"
b = "#include <stdio.h>%sint main() { %s  char *a = %s%s%s,%s       *b = %s%s%s,%s       *c = %s%s%s;%s  printf(a,34,b,34,10,34,c,34,10,34,a,34,10);%s}%s"
c = "a = %c%s%c%cb = %c%s%c%cc = %c%s%c%cprint(a.format(chr(34),b,chr(10),c,a,chr(92),chr(39)))%c"
print(a.format(chr(34),b,chr(10),c,a,chr(92),chr(39)))

{% endhighlight %}

執行 Python 後得到的 Bash 腳本：

{% highlight bash linenos %}
#!/bin/bash
N=$'\x0a'
Q=$'\x22'
B='a = %c%s%c%cb = %c%s%c%cc = %c%s%c%cprint(a.format(chr(34),b,chr(10),c,a,chr(92),chr(39)))%c'
C='#!/bin/bash{2}N=${6}{5}x0a{6}{2}Q=${6}{5}x22{6}{2}B={6}{3}{6}{2}C={6}{4}{6}{2}A={0}{1}{0}{2}printf {0}$A{0} {0}$N{0} {0}$N{0} {0}$Q{0} {0}$B{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$C{0} {0}$Q{0} {0}$N{0} {0}$Q{0} {0}$A{0} {0}$Q{0} {0}$N{0} {0}$N{0} {0}$N{0}{2}'
A="#include <stdio.h>%sint main() { %s  char *a = %s%s%s,%s       *b = %s%s%s,%s       *c = %s%s%s;%s  printf(a,34,b,34,10,34,c,34,10,34,a,34,10);%s}%s"
printf "$A" "$N" "$N" "$Q" "$B" "$Q" "$N" "$Q" "$C" "$Q" "$N" "$Q" "$A" "$Q" "$N" "$N" "$N"

{% endhighlight %}

講到這裡，我們看到各種 Quine 的變形，也注意到在一個 Quine 中，可以任意加減各種指令。事實上，我們有下列的結論：

> 對於任意程式，我們皆可以植入一個印出本身程式碼的副程式（subroutine）$$Quine()$$。

若要實作 $$Quine()$$，最簡單的方法就是在該副程式中，從硬碟開啟自己的原始碼並印出，意即我們上一篇所探討的「作弊 Quine」。我們也提溜作弊 Quine 和非作弊 Quine （true Quine）的關係：兩者事實上為一體兩面的問題，存在作弊 Quine，便存在對應的真實 Quine 寫法。

這樣有 Quine 函式的程式，在邏輯中有一些有趣的意涵。這裡我們來討論其中幾個。

## 條件 Quine 與隱形後門

一個沒有輸入，只輸出自己程式碼的程式，當然沒有什麼實值用途（事實上，我們本來就很少使用沒有輸入的程式）。這裡來看看一種變形，姑且稱作「條件 Quine」。

條件 Quine 的功能如下：輸入特定的參數時，會輸出自己的程式碼，但是輸入其他的參數則其他功能。有了個 $$Quine()$$ 函數，這種設計便很容易達到。

現實生活中，到底有沒有這樣的應用程式？答案是有的，就是 C 編譯器。許多程式，包括編譯器本身，皆由 C 語言撰寫而成。從另一個角度看，若「程式碼」為二進位機器碼，「參數」為 C 程式碼，那麼當編譯器編譯自己的時候，就是接受了特定輸入，輸出自己的程式碼了（時至今日，GCC、Clang、與 Visual C++ 都使用 C++。但這不影響我們接下來的結論）。這個特性顯然和編譯器的實作方式無關。

1984 年，Unix 作者之一 Ken Thompson 在演講〈關於信任「信任」一事的沉思〉（[*Reflecting on Trusting Trust*](https://dl.acm.org/citation.cfm?id=358210)） 使用了這個特性，假想出如下的情境：

在登入時，作業系統都有專門的程序處理帳號和密碼。我們希望利用該程序的漏洞，在沒有正確帳密的狀況下登入並攻擊電腦。想當然，寫得好的登入程式並不會平白出現這種漏洞。如果可以改動登入程式的程式碼，我們能故意植入後門（例如使用者輸入特定名稱時直接登入），並透過系統更新散播有問題的程式給其他使用者。

於是，我們把登入程式寫進這樣的後門：

{% highlight cpp %}
if(username="backdoor") {
  //執行後門
} else {
  //正常處理登入
}
{% endhighlight %}

把它提交給PM，希望它的其他開發者不會發現程式碼被調包。但顯然這個方法太明顯，一來沒什麼開發者會中計，二來一但被發現，只要及時把程式碼改回來，釋出更新就能處理完。一個把後門藏得更好的方法，不是改動登入程式本身，而是在編譯器中植入改變程式碼的後門，如：

{% highlight cpp %}
if(/*正在編譯登入程式*/) {
  //在程式中植入後門
} else {
  //正常編譯
}
{% endhighlight %}

這麼一來，有人發現登入程式有問題時，重新編譯也無法除去後門，因為問題出在編譯器本身，而不是程式寫錯。但這也只是把上述的問題推到編譯器。若及時補好編譯器的漏洞，我們的計畫還是泡湯。但如果我們採用以下的計畫呢？

* 在編譯器中寫入下列的後門：
{% highlight cpp %}
if(/*正在編譯C編譯器*/) {
  //植入這段 if … else if … else
} else if(/*正在編譯登入程式*/) {
  //植入後門
} else {
  //正常編譯
}
{% endhighlight %}

* 把這個有問題的編譯器編譯出來，並把PM的編譯器調包。

* 把上述的程式碼刪除，銷毀證據。

使用這樣的編譯器究竟會發生什麼事？編譯登入程式時，顯然會被植入後門，即便改了程式碼無法解決。如果有人用這個有問題的編譯器編譯了一個編譯器，則編譯出的編譯器也會被植入這個漏洞，後門便散播了出去。我們也無法改變編譯器的程式碼，因為編譯時只會再次輸出成有問題的機器碼。漏洞於是永遠存在機器碼中，而除錯變得極其困難，而一切的關鍵就在於條件 Quine 的運用。
 
## 提外話：印出自己的雜湊值
我們在介紹不動點定理時，提到可以寫出一個程式，印出自己的 sha256 雜湊值（Madore 的原文寫的是 md5，但是 md5 這幾年顯得不太入流了……）。這也許不太直觀，畢竟這類雜湊演算法的目的就是希望無法輕易編造某個雜湊值的資料，但是有了 quine 的知識，這樣的程式並不難寫出。

考慮以下用 bash 寫成的 quine：
{% highlight bash linenos %}
#!/bin/bash
Q=$(printf "\x27")
T='#!/bin/bash
Q=$(printf "\x27")
cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
'
cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
{% endhighlight %}

我們當然也可以把 Quine 的內容存在某個變數 S 中：
{% highlight bash linenos %}
#!/bin/bash
Q=$(printf "\x27")
T='#!/bin/bash
Q=$(printf "\x27")
S=$(cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
)
echo "$S"
'
S=$(cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
)
echo "$S"
{% endhighlight %}

此時，既然有了一個變數存了自己的程式碼，只要把該變數傳到 `sha256sum` 中，就會輸出自己的 sha256 值了。
{% highlight bash linenos %}
#!/bin/bash
Q=$(printf "\x27")
T='#!/bin/bash
Q=$(printf "\x27")
S=$(cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
)
echo "$S" | sha256sum
'
S=$(cat <<EOF
$(echo "$T" | head -n2)
$(echo "T=$Q$T$Q")
$(echo "$T" | tail -n8)
EOF
)
echo "$S" | sha256sum
{% endhighlight %}

而輸出為：
{% highlight console linenos %}
$ bash quine.sh
e185fac77a1c21c842ac53e22116a6385282bff5bde011ba4ff6c005077cba16  -
$ sha256sum quine.sh
e185fac77a1c21c842ac53e22116a6385282bff5bde011ba4ff6c005077cba16  quine.sh
{% endhighlight %}

也許有人認為這幾行還有作弊的成份在裡面，因為 `sha256sum` 呼叫了外部程式，但消除這一段概念上還是可行的：把整段 `sha256sum` 的實作方法放進程式中與變數 S 中。這樣的程式怎麼寫？有什麼要注意的？這時，繼承 ouroboros 那一段的精神，不難看出，實作方法如下：

> The implementation and validation is trivial and left as an exercise.

 *(待續)*
