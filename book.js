class Book{
    constructor(title,author,page,read){
        this.title=String(title);
        this.author=String(author);
        this.page=Number(page);
        this.read=Boolean(read);

        
    }
    info(){
        console.log("title: ",this.title)
        console.log("author: ",this.author)
        console.log("page: ",this.page)
        console.log("read: ",this.read)
    }
    
}

let book1=new Book("xxx","yyy",10,false);
book1.info();
