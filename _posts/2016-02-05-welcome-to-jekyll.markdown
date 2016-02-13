---
layout: post
title:  "Welcome to Jekyll!"
date:   2016-02-05 11:09:59 +0800
categories: jekyll update
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

{% highlight cpp linenos %}
#define UNICODE
#include <windows.h>

using namespace std;

class aclass{
public:
  aclass(int foo, char bar){foo = 0; bar = 1;}
  ~aclass();
  static int references;
private:
  const int privateFunc(int foo) const;
}
 
int main(int argc, char **argv) {
  int speed = 0, speed1 = 0, speed2 = 0; // 1-20
  printf("Set Mouse Speed by Maverick\n");
 
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("Current speed: %2d\n", speed);
 
  if (argc == 1) return 0;
  if (argc >= 2) sscanf(argv[1], "%d", &speed1);
  if (argc >= 3) sscanf(argv[2], "%d", &speed2);
 
  if (argc == 2) // set speed to first value
    speed = speed1;
  else if (speed == speed1 || speed == speed2) // alternate
    speed = speed1 + speed2 - speed;
  else
    speed = speed1;  // start with first value
 
  SystemParametersInfo(SPI_SETMOUSESPEED, 0,  speed, 0);
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("New speed:     %2d\n", speed);
  return 0;
}

{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

Another Heading
-----

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare arcu in diam ullamcorper, ac aliquam tellus dignissim. Fusce non volutpat turpis. Vestibulum iaculis mauris eget nisi mollis tempor eu sagittis est. Sed dapibus vitae lacus et auctor. Duis ultrices fringilla risus sed tincidunt. Proin bibendum tellus ac nibh commodo tempor. Aenean suscipit consectetur suscipit. Aenean mauris enim, venenatis sit amet ex eu, molestie auctor ipsum. Aliquam tincidunt non nisl fringilla ornare. Suspendisse lobortis quam tellus, non suscipit quam egestas et. Nullam aliquet purus a mollis feugiat. Quisque scelerisque aliquet urna, at accumsan arcu volutpat nec.

Suspendisse rhoncus ac sapien sed mattis. Aliquam ac consectetur orci. Donec scelerisque pharetra tellus, vitae ultrices risus suscipit at. Morbi interdum felis non efficitur sagittis. Phasellus quis lobortis dui, a pretium mauris. Nulla congue vestibulum gravida. Duis cursus semper tellus, ut blandit dui tristique nec. Pellentesque sit amet fringilla nisl. Sed consectetur cursus lacus, ac aliquam urna porta eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dolor erat, ornare a eros id, mattis suscipit erat.

可以打中文
--------------
使用[亂數假文產生器][chinese-lipsum]。

離展子為跑名物明清明吸性中動面人商自母院引？

在最面！家天小、想上全出但政子們濟家新時來：的錢有青力選，氣第座上工完觀經備要區理調麼到修孩業；訴解手毛。在今我。

子已子學考兒形創聯一蘭？總整無度導代有級能可止相，所黑聲。上我今力一法絕建化推北收福心變點其育作政阿著我……麗企公書光客音和野品母在可員自登便國手分……心劇前法級化寫命們率縣的機這那；此的國對到我果人……認位山最。

小標題
========

公時布設中、步服完國示無……解一官士座沒山配，質背草利個這演，老調。

組月一、是道流光於了西電科準重，行經同；字紙持春幾等有子示看和學方因重……業叫放獨起法看笑似可地院氣著華至高片細然證爾未個你活半和量不如有上。化南她舉。心心的為基他以知不灣自來事統最一果全作是的報輪流率作如點戰情一成時英地成大出吃之們？選麗樣有的經開、做四一已外怎。


[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
[chinese-lipsum]: http://www.richyli.com/tool/loremipsum/
