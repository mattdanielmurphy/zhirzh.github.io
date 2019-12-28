If we want to use SSH to access remote machines we must ensure that the host has a public IP and is running a SSH server daemon. We can also access private machines (like those behind a firewall) if we have access to at least one public machine.

Let's look at 3 cases:

1. public/private -> public
1. public -> private
1. private -> private

To make things easier, I introduce characters _Alice_ who wants to access a remote machine via SSH and Bob who owns the said machine.

## Case 1

Accessing a public machine is pretty straightforward. The first time we connect to a host, we are presented with a fingerprint of that host's public key. Once we accept the host key, it gets saved in our `known_hosts` file and is used to verify all future connections. Then we see a password prompt asking for `bob`'s password. We enter the correct password and we are done.

```sh
# Alice on alice_machine
alice@alice_machine$ ssh bob@bob_machine

The authenticity of host 'bob_machine' cannot be established.
ECDSA key fingerprint is SHA256:iqtfGBdyKViB4dV3lY1pYaZizgVwTV/ntQ0k4A1elIE.
Are you sure you want to continue connecting (yes/no)?
> yes

Warning: Permanently added 'bob_machine' (ECDSA) to the list of known hosts.

Password: # Bob's password
> ********

# Alice on bob_machine as Bob
bob@bob_machine$ # DONE!
```

<Insert type="image" src="1.jpg" alt="SSH into public machine" />

## Case 2

In the second case, `bob_machine` doesn't have a public IP and so Alice cannot directly connect to it. So now Bob must be the one to initiate a connection to Alice's public machine so that Alice can use it. Bob has to use Remote Port Forwarding. One pre-requisite for this is that now Alice must also have a SSH server daemon running on her machine.

Bob connects to `alice_machine` and opens a forwarding tunnel connecting to `port 2222` there. Once the tunnel is created, any actions performed against `port 2222` on `alice_machine` will be forwarded to `port 22` on `bob_machine`.

The extra `-N` flag tells SSH that we just want to run a command and don't need an interactive shell.

```sh
# Bob on bob_machine
bob@bob_machine$ ssh -N -R 2222:localhost:22 alice@alice_machine

Password: # Alice's password
> ****************
```

Alice can now use this tunnel to access `bob_machine` by issuing the `ssh` command against `port 2222` on her machine but using Bob's username since the SSH command will be forwarded to `bob_machine`.

```sh
# Alice on alice_machine
alice@alice_machine$ ssh -p 2222 bob@localhost

Password: # Bob's password
> ********

# Alice on bob_machine as Bob
bob@bob_machine$ # DONE!
```

<Insert type="image" src="2.jpg" alt="SSH into private machine" />

## Case 3

With both Alice's & `bob_machine` hidden from each other, we need a third party's help. Enter the middle guy, Matt and his `matt_machine` that can accessed publicly. This splits the problem into two halves that we have already solved.

```
private -> private == (private -> public) + (public -> private)
```

Just like before, Bob starts out by opening a tunnel connection but this time, Bob connects to `matt_machine`. But instead of `port 2222`, we open the tunnel on `port 22` directly.

```sh
# Bob on bob_machine
bob@bob_machine$ ssh -N -R 2222:localhost:22 matt@matt_machine

Password: # Matt's password
> ****
```

Next, Alice connects to `matt_machine` as Bob on `port 2222` and then issues the same SSH command as before.

```sh
# Alice on alice_machine
alice@alice_machine$ ssh -p 2222 bob@matt_machine

Password: # Bob's password
> ********

# Alice on bob_machine as Bob
bob@bob_machine$ # DONE!
```

<Insert type="image" src="3.jpg" alt="SSH into private machine from another private machine" />

## Addendum

By looking at the code, it might come off as if each user needs access to some other user's account. This is not true. In my examples, I am using one-user-per-machine and so this appears to be the case but it is totally possible that Alice has an account on `bob_machine` and doesn't need Bob's password. The same is true for all other scenarios.
