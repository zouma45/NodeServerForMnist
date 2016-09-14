
import datetime
import numpy as np
import tensorflow as tf

##from matplotlib import pyplot as plt
import matplotlib.image as mpimg
from random import randint


from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

x = tf.placeholder("float", [None, 784])

W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))

y = tf.nn.softmax(tf.matmul(x,W) + b)
y_ = tf.placeholder("float", [None,10])

cross_entropy = -tf.reduce_sum(y_*tf.log(y))

train_step = tf.train.GradientDescentOptimizer(0.01).minimize(cross_entropy)
saver = tf.train.Saver()


init = tf.initialize_all_variables()

sess = tf.Session()
sess.run(init)

#Train our model
iter = 100
for i in range(iter):
  batch_xs, batch_ys = mnist.train.next_batch(100)
  sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})


save_path = saver.save(sess, "mnist_model_20000_Gradient_batch.ckpt")
print ("Model saved in file: ", save_path)

#print("test accuracy %g"%accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))

#Evaluationg our model:
correct_prediction=tf.equal(tf.argmax(y,1), tf.argmax(y_,1))

accuracy=tf.reduce_mean(tf.cast(correct_prediction,"float"))
print "Accuracy: ", sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels})

