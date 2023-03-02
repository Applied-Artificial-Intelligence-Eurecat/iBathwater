import * as Imap from 'imap';
import * as util from 'util';

export class MailClient {

    private imap: Imap;

    constructor (user: string, password: string, imapHost: string, port: number, tls: boolean){
        this.imap = new Imap({
            user: user, 
            password: password, 
            host: imapHost, 
            port: port, 
            tls: tls
        });
    }

    private openInbox(cb){
        this.imap.openBox('INBOX', true, cb); 
    }

    public connectMail (){
        this.imap.once('ready', () => {
            console.log('READY...')
            setInterval(() => {
                this.openInbox((err, box)=> {
                    if (err) throw err; 
                    this.imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], (err, results)=> {
                        if (err) throw err; 
                        var newestEmail= this.imap.fetch(results, { bodies: '' });
    
                        newestEmail.on('message', function(msg, seqno) {
                            console.log('Message #%d', seqno);
                            var prefix = '(#' + seqno + ') ';
                            msg.on('body', function(stream, info) {
                              console.log(prefix + 'Body');
                              console.log('msg-' + seqno + '-body.txt');
                            });
                            msg.once('attributes', function(attrs) {
                              console.log(prefix + 'Attributes: %s', util.inspect(attrs, false, 8));
                            });
                            msg.once('end', function() {
                              console.log(prefix + 'Finished');
                            });
                          });
                        
                        
                        newestEmail.once('error', function(err) {
                            console.log('Fetch error: ' + err);
                         });
                        newestEmail.once('end', function() {
                            console.log('Done fetching all messages!');
                        });
                    });
    
                });
            }, 180000)
            
        });

        this.imap.connect();
    }


}